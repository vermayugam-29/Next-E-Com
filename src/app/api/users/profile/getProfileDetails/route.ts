import dbConnect from "@/lib/dbConnect";
import Profile from "@/models/profileModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    await dbConnect();

    try {
        const token = await getToken({req});
        const profileId = token!.additionalInfo;

        const profile = await Profile.findById(profileId)
        .populate('addresses').populate('defaultAddress').exec();

        return NextResponse.json({
            success : true,
            message : 'Profile details fetched successfully',
            data : profile
        })
    } catch (err : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while fetching user details',
            error : err.message
        } , {
            status : 500
        })
    }
}