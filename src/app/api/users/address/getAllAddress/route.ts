import dbConnect from "@/lib/dbConnect";
import Profile from "@/models/profileModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    await dbConnect();

    try {
        const token = await getToken({req});
        const additionalInfo = token?.additionalInfo;

        if(!additionalInfo) {
            return NextResponse.json({
                success : false,
                message : 'Please login to access address details'
            } , {
                status : 404
            })
        }

        const profile = await Profile.findById(additionalInfo).populate('addresses');
        if(!profile) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with a valid address id',
            } , {
                status : 404
            })
        }

        return NextResponse.json({
            success : true,
            message : 'Successfully fetched all the addresses',
            data : profile
        } , {
            status : 200
        })
    } catch (err : any) {
        return NextResponse.json({
            success : false,
            message : `Something went wrong while fetching user's address`,
            error : err.message
        } , {
            status : 500
        })
    }
}