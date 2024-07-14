import dbConnect from "@/lib/dbConnect";
import Address from "@/models/addressModel";
import Profile from "@/models/profileModel";
import { addressValidation } from "@/schemas/addressSchema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    await dbConnect();

    try {
        const {houseNo , landmark , city , state , pincode} = addressValidation.parse(await req.json());

        const token = await getToken({req});
        const additionalInfo = token?.additionalInfo;

        if(!additionalInfo) {
            return NextResponse.json({
                success : false,
                message : 'Please login to continue'
            } , {
                status : 404
            })
        }

        const profile = await Profile.findById(additionalInfo);

        if(!profile) {
            return NextResponse.json({
                success : false,
                message : 'No such user found'
            } , {
                status : 404
            })
        }

        const address  = await Address.create(
            {
                houseNo , landmark , city , state , pincode
            }
        );

        const updatedProfile =  await Profile.findByIdAndUpdate(
            profile._id,
            {$push : {addresses : address._id}},
            {new : true}
        ).populate('addresses');


        return NextResponse.json({
            success : true,
            message : 'Successfully added new address to your profile',
            data : updatedProfile
        },{
            status : 200
        })
    } catch (err : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while adding address please try again later',
            error : err.message
        } , {
            status : 500
        })
    }
}