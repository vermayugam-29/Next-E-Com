//if role === admin get all the chats otherwise fetch by chat id

import dbConnect from "@/lib/dbConnect";
import Chat from "@/models/chatModel";
import User from "@/models/userModel";
import { getToken } from "next-auth/jwt";
import { NextRequest , NextResponse } from "next/server";

export const POST = async(req : NextRequest) => {
    await dbConnect();

    try {
        const token = await getToken({req});
        const userId = token!._id;
        const accountType = token!.accounType;


        //use middleware instead
        if(!userId || !token) {
            return NextResponse.json({
                success : false,
                message : 'Please login to continue'
            })
        }

        let chats;
        if(accountType === 'Admin') {
            chats = await Chat.find({}).populate('messages');
        } else {
            const user = await User.findById(userId);
            chats = await Chat.findById(user?.chat);
        }

        return NextResponse.json({
            success : true,
            message : 'Successfully fetched all the chats',
            data : chats
        } , {
            status : 200
        })
    } catch (err : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while fetching chats',
            error : err.message
        },{
            status : 500
        })
    }
}