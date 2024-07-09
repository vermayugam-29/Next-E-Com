import dbConnect from "@/lib/dbConnect";
import { messageValidation } from "@/schemas/messageSchema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import Chat from "@/models/chatModel";
import Message from "@/models/messageModel.";

export const POST = async(req : NextRequest) => {
    await dbConnect();

    try {
        const {chatId , description} = messageValidation.parse(req.json());

        const token = await getToken({req});
        const userId = token?._id;

        if(!userId) {
            return NextResponse.json({
                success : false,
                message : 'You need to login first',
            } ,{
                status : 404
            } );
        }

        let chat = await Chat.findById(chatId);
        if(!chat) {
            return NextResponse.json({
                success : false,
                message : 'No such chat found'
            } ,{
                status : 404
            } )
        }

        const message = await Message.create(
            {
                user : userId , description
            }
        );

        chat = await Chat.findByIdAndUpdate(
            chat._id,
            {
                $push : { messages : message._id }
            } ,
            { new : true }
        );

        return NextResponse.json({
            success : true,
            message : 'Message sent successfully',
            data : message
        })
    } catch (err : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while sending message',
            error : err.message
        } ,{
            status : 500
        } )
    }
}