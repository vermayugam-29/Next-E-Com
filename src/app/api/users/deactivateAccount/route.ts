import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {compare} from 'bcrypt'

export async function POST(req : NextRequest) {
    await dbConnect();

    try {
        const { password } = await req.json();
        const token = await getToken({req});
        const userId = token!._id;


        const user = await User.findById(userId);
        if(!user) {
            return NextResponse.json({
                success : false,
                message : 'No such user found',
            } , {
                status : 400
            })
        }

        if(user.deleteAccountDate !== null) {
            return NextResponse.json({
                success : false,
                message : 'Your account has already been deactivated'
            }  ,{
                status : 404
            })
        }

        if(await compare(password , user.password)) {
            user.deleteAccountDate = new Date( Date.now() + (30 * 24 * 60 * 60 * 1000) );
            await user.save();

            const response =  NextResponse.json({
                success : true,
                message : 'Account deactivated successfully',
            } , {
                status : 200
            })

            response.cookies.set('next-auth.session-token', '', { expires: new Date(0), path: '/' });
            response.cookies.set('next-auth.csrf-token', '', { expires: new Date(0), path: '/' });

            return response;
        }

        return NextResponse.json({
            success : false,
            message : 'Please enter correct passsword',
        } , {
            status : 404
        })
    } catch (err : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while deactivating your account',
            error : err.message
        } , {
            status : 500
        })
    }
}