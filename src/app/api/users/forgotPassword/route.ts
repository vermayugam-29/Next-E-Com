//how can i handle this should i send a verification link on email or should i send otp ??
//send change password link from frontend in mail and then
//send a url which contains user's email so we can fetch from it


import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";
import { logInValidation } from "@/schemas/logInSchema";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req : NextRequest) {
    await dbConnect();

    try {
        const {email , password} = logInValidation.parse(req.json());

        const user = await User.findOne({email});

        if(!user) {
            //we can also check frst while forgot passsword route that if there is such user present ??
            return NextResponse.json({
                success : false,
                message : 'No such user found please sign up first'
            } ,{
                status : 401
            } )
        }

        const hashedPassword = await hash(password , 10);

        user.password = hashedPassword;
        user.save();

        return NextResponse.json({
            success : true,
            message : 'Password changed successfully , please login to continue',
            data : user
        } ,{
            status : 200
        } )
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : `Something went wrong while changing user's password`,
            error : error.message
        } ,{
            status : 500
        })
    } 
}