import dbConnect from "@/lib/dbConnect"
import Profile from "@/models/profileModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server"

export const PUT = async(req : NextRequest) => {
    await dbConnect();

    try {
        const {image , phoneNumber , dob , gender} = await req.json();

        const token = await getToken({req});
        const additionalInfo = token!.additionalInfo;



        const profile = await Profile.findById(additionalInfo);

        if(!profile) {
            return NextResponse.json({
                success : false,
                message : 'No such profile found',
            } , {
                status : 404
            })
        }

        if(image) {
            profile.profilePhoto = image;
        }
        if(phoneNumber) {
            profile.phoneNumber = phoneNumber
        }
        if(dob) {
            profile.dob = dob;
        }
        if(gender) {
            profile.gender = gender;
        }

        await profile.save()
        .then(profile => profile.populate('addresses defaultAddress'))
        .catch(err => console.log(err));

        return NextResponse.json({
            success : true,
            message : 'Profile updated successfully',
            data : profile
        },{
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while updating profile',
            error : error.message
        } , {
            status : 500
        })
    }
}