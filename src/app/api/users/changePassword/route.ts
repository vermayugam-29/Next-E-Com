import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
import User from "@/models/userModel";
import { compare, hash } from "bcrypt";
import { passwordValidation } from "@/schemas/passwordSchema";

export const PUT = async(req : NextRequest) => {
    await dbConnect();

    try {
        const { oldPassword} = await req.json();
        const {password} = passwordValidation.parse(await req.json());
        const token = await getToken({req});
        const userId = token?._id;

        if(!userId) {
            return NextResponse.json({
                success : false,
                message : 'No user found to change password',
            } , {
                status : 400
            })
        }

        const user = await User.findById(userId);
        if(!user) {
            return NextResponse.json({
                success : false,
                message : 'No user found'
            } , {
                status : 404
            })
        }

        if(await compare(oldPassword , user.password)) {
            const hashedPassword = await hash(password , 10);

            user.password = hashedPassword;
            await user.save();

            return NextResponse.json({
                success : true,
                message : 'Password changed  successfully',
                data : user
            },{
                status : 200
            })
        }

        return NextResponse.json({
            success : false,
            message : 'Incorrect password'
        } ,{
            status : 404
        } )

    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while changing your password',
            error : error.message
        } ,{
            status : 500
        } )
    }
}