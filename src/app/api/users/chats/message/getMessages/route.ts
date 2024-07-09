import dbConnect from "@/lib/dbConnect";
import Chat from "@/models/chatModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    await dbConnect();

    try {
        const { chatId } = await req.json();
        if (!chatId) {
            return NextResponse.json({
                success: false,
                message: 'Please provide with a chat id to fetch messages'
            }, {
                status: 400
            })
        }

        const chat = await Chat.findById(chatId)?.populate('messages');
        if (!chat) {
            return NextResponse.json({
                success: false,
                message: 'No such chat found',
            }, {
                status: 404
            })
        }

        return NextResponse.json({
            success: true,
            message: 'Successfully fetched all the messages',
            data: chat
        }, {
            status: 200
        })
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: 'Something went wrong while fetching messages',
            error: err.message
        }, {
            status: 500
        })
    }
}