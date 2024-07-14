import dbConnect from "@/lib/dbConnect";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await dbConnect();

    try {
        console.log('yugam');
        const token = await getToken({ req });
        const userId = token?._id;

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'You should have logged in first'
            }, {
                status: 404
            })
        }

        const response = NextResponse.json({
            success: true,
            message: 'Logged out successfully',
        }, {
            status: 200
        })

        response.cookies.set('next-auth.session-token', '', { expires: new Date(0), path: '/' });
        response.cookies.set('next-auth.csrf-token', '', { expires: new Date(0), path: '/' });


        return response;
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: 'Something went wrong while logging out user',
            error: err.message
        }, {
            status: 500
        })
    }
}