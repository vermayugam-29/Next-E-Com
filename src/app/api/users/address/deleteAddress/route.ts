import dbConnect from "@/lib/dbConnect";
import Address from "@/models/addressModel";
import Profile from "@/models/profileModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async(req : NextRequest) => {
    await dbConnect();

    try {
        const {addressId} = await req.json();

        if(!addressId) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with a address id to continue',
            }, {
                status : 400
            })
        }

        const token = await getToken({req});
        const {additionalInfo} = token!;

        const address = await Address.findById(addressId);
        if(!address) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with a valid addressid'
            }, {
                status : 404
            })
        }

        const profile = await Profile.findByIdAndUpdate(
            additionalInfo,
            {
                $pull : { addresses : address._id }
            },
            { new : true }
        )

        if(!profile) {
            return NextResponse.json({
                success : false,
                message : 'No such profile found'
            }, {
                status : 404
            })
        }

        if(profile.defaultAddress && profile.defaultAddress.toString() === address._id) {
            profile!.defaultAddress = null;
        }

        await profile.save()
        .then(profile => profile.populate('addresses defaultAddress'))
        .catch(err => console.log(err));

        await Address.findByIdAndUpdate(
            address._id,
            {deleted : true},
            {new : true}
        );

        return NextResponse.json({
            success : true,
            message : 'Successfully deleted addreess',
            data : profile
        }, {
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while deleting this address'
        }, {
            status : 500
        })
    }
}