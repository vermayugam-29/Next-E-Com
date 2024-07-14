import dbConnect from "@/lib/dbConnect";
import Address from "@/models/addressModel";
import Profile from "@/models/profileModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async(req : NextRequest) => {
    await dbConnect();

    try {
        const {addressId} = await req.json();

        if(!addressId) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with a message id'
            }, {
                status : 400
            })
        }

        const address = await Address.findById(addressId);

        if(!address) {
            return NextResponse.json({
                success : false,
                message :  'Please provide with a valid address id'
            }, {
                status : 404
            })
        }

        const token = await getToken({req});
        const {additionalInfo} = token!;

        const profile = await Profile.findByIdAndUpdate(
            additionalInfo ,
            {defaultAddress : addressId},
            {new : true}
        ).populate('addresses').populate('defaultAddress').exec();

        return NextResponse.json({
            success : true,
            message : 'Successfully updated default addresss',
            data : profile
        }, {
            status : 200
        })
        
    } catch (err : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while setting default address',
            error : err.message
        })
    }
}