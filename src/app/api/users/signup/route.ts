import { NextRequest , NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";
import {hash} from 'bcrypt';
import { signUpValidation } from "@/schemas/signUpSchema";
import { generateDefault } from "@/utils/defaultImage";
import OTP from "@/models/otpModel";


export async function POST(req : NextRequest) {
    await dbConnect();

    try {
        const { name , email , password } = signUpValidation.parse(req.json());
        const {accountType , otp} = await req.json();

        const user = await User.findOne({email});
        if(user) {
            return NextResponse.json({
                success : false,
                message : 'Email already use please try with different one'
            } , {
                status : 400
            })
        }

        let imageUrl = generateDefault(name);

        const otpResult = await OTP.find({email : email}).sort({createdAt : -1}).limit(1);
        if(otpResult.length === 0){
            return NextResponse.json({
                success : false,
                message : 'No otp found'
            })
        }

        if(otpResult[0].otp !== otp) {
            return NextResponse.json({
                success : false,
                message : 'OTP not valid'
            },{
                status : 410
            })
        }

        const hashedPassword = await hash(password , 10);

        const newUser = await User.create(
            {name , email , password : hashedPassword , image : imageUrl , accountType}
        );

        return NextResponse.json({
            success : true,
            message : 'Account created Successfully',
            data : newUser
        } , {
            status : 200
        })
    } catch(error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while creating new account , please try again later',
            error : error.message
        } , {
            status : 500
        })
    }
}