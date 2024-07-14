import { NextRequest , NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";
import {hash} from 'bcrypt';
import { signUpValidation } from "@/schemas/signUpSchema";
import { generateDefault } from "@/utils/defaultImage";
import OTP from "@/models/otpModel";
import Cart from "@/models/cartModel";
import Profile from "@/models/profileModel";
import Chat from "@/models/chatModel";


export async function POST(req : NextRequest) {
    await dbConnect();

    try {
        const data = await req.json();
        const { name , email , password /*, image */ } = signUpValidation.parse(data);

        const {accountType , otp } = data;

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

        const cart = await Cart.create(
            {
                items : [],
                totalAmount : 0
            }
        );

        const chat = await Chat.create(
            {
                messages : []
            }
        );

        const profile = await Profile.create(
            {
                profilePhoto : /*image ? image :*/ imageUrl,
                phoneNumber : null,
                addresses : []
            }
        )

        const newUser = await User.create(
            {
                name , email , password : hashedPassword ,
                image : imageUrl , accountType, myCart : cart._id,
                additionalInfo : profile._id , chat : chat._id
            }
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