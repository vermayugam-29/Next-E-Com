import { NextRequest , NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import OTP from "@/models/otpModel";
import User from "@/models/userModel";
import otpGenerator from 'otp-generator'
import { otpValidation } from "@/schemas/otpSchema";

export async function POST(req : NextRequest) {

    //await 
    dbConnect();

    try {
        const data = await req.json();
        const { email } = otpValidation.parse(data);



        const user = await User.findOne({email});
        if(user) {
            return NextResponse.json({
                success : true,
                message : 'Email already in use please try with different email'
            },{
                status : 400
            })
        }

        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false
        })

        let otpInDb = await OTP.findOne({otp});

        while(otpInDb){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false
            })
            otpInDb = await OTP.findOne({otp});
        }

        const generatedOtp = await OTP.create(
            {email , otp}
        );

        return NextResponse.json({
            success : true,
            message : 'OTP sent to your email succesfully',
            data : generatedOtp.otp
        },{
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while generating otp',
            error : error.message
        },{
            status : 500
        })
    }
}