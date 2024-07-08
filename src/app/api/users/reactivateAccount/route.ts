import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";
import { logInValidation } from "@/schemas/logInSchema";
import { NextRequest, NextResponse } from "next/server";
import {compare} from 'bcrypt';
import {sign} from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

export const PUT = async(req : NextRequest) => {
    await dbConnect();

    try {
        const { email , password } = logInValidation.parse(req.json());

        const user = await User.findOne( {email : email} );

        if(!user) {
            return NextResponse.json({
                success : false,
                message : 'No such user found'
            } ,{
                status : 404
            } )
        }


        if(user.deleteAccountDate === null) {
            return NextResponse.json({
                success : false,
                message : 'Your account has not been deactivated yet'
            } ,{
                status : 404
            } )
        }

        if(await compare(password , user.password)) {
            user.deleteAccountDate = null;
            await user.save();

            const payload = {
                _id : user._id,
                accountType : user.accountType,
                myCart : user.myCart,
                myOrders : user.myOrders,
                additionalInfo : user.additionalInfo
            }



            const token = sign(payload, process.env.NEXTAUTH_SECRET!, {
                expiresIn: '3d'
            });

            return NextResponse.json({
                success : true,
                message : 'Account reactivated successfully',
                data : user,
                token : token
            } , {
                status : 200
            })
        }

        return NextResponse.json({
            success : false,
            message : 'Incorrect Password'
        } ,{
            status : 404
        } )

    } catch (err : any){
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while reactivating account',
            error : err.message
        } , {
            status : 500
        })
    }
}

/*
import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";
import { logInValidation } from "@/schemas/logInSchema";
import { NextRequest, NextResponse } from "next/server";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie'; // Import serialize from cookie to set cookies
import dotenv from "dotenv";
dotenv.config();

export const PUT = async(req : NextRequest) => {
    await dbConnect();

    try {
        const { email , password } = logInValidation.parse(req.json());

        const user = await User.findOne( {email : email} );

        if(!user) {
            return NextResponse.json({
                success : false,
                message : 'No such user found'
            } ,{
                status : 404
            } )
        }

        if(user.deleteAccountDate === null) {
            return NextResponse.json({
                success : false,
                message : 'Your account has not been deactivated yet'
            } ,{
                status : 404
            } )
        }

        if(await compare(password , user.password)) {
            user.deleteAccountDate = null;
            await user.save();

            // Prepare JWT payload
            const payload = {
                _id : user._id,
                accountType : user.accountType,
                myCart : user.myCart,
                myOrders : user.myOrders,
                additionalInfo : user.additionalInfo
            };

            // Sign JWT token
            const token = sign(payload, process.env.NEXTAUTH_SECRET!, {
                expiresIn: '3d'
            });

            // Set token as a cookie
            const cookieOptions = {
                httpOnly: true, // Ensure the cookie is only accessible through HTTP(S) requests
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production environment
                maxAge: 3 * 24 * 60 * 60, // Cookie expiry in seconds (3 days)
                sameSite: 'strict', // Protect against CSRF attacks
                path: '/' // Set the cookie path to root
            };

            const cookieSerialized = serialize('auth_token', token, cookieOptions);

            // Send response with cookie and JSON data
            const response = NextResponse.json({
                success : true,
                message : 'Account reactivated successfully',
                data : user
            }, {
                status : 200,
                headers: {
                    'Set-Cookie': cookieSerialized // Set the cookie in the response headers
                }
            });

            return response;
        }

        return NextResponse.json({
            success : false,
            message : 'Incorrect Password'
        } ,{
            status : 404
        } );

    } catch (err : any){
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while reactivating account',
            error : err.message
        } , {
            status : 500
        });
    }
}

*/