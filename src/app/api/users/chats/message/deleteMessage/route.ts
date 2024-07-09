import dbConnect from "@/lib/dbConnect";
import Message from "@/models/messageModel.";
import User from "@/models/userModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async(req : NextRequest) => {
    await dbConnect();

    try {
        const {messageId , deleteType , deletedBy} = await req.json();

        const token = await getToken({req});
        const userId = token?._id;

        if(!userId) {
            return NextResponse.json({
                success : false,
                message : 'Please login first'
            } ,{
                status : 400
            })
        }

        if(!messageId || !deleteType || !deletedBy) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with a message if to delete it'
            } ,{
                status : 400
            })
        }

        let message = await Message.findById(messageId);
        if(!message) {
            return NextResponse.json({
                success : false,
                message : 'No such message found'
            }, {
                status : 404
            })
        }

        const user = await User.findById(userId);
        if(!user) {
            return NextResponse.json({
                success : false,
                message : 'Please login first'
            } ,{
                status : 400
            })
        }

        if(deleteType === 'Delete For Everyone') {
            if(message.maxDeleteDate > new Date(Date.now())) {
                message = await Message.findByIdAndUpdate(
                    message._id,
                    {
                        description : `This messsage was deleted by ${user.name}`,
                        deletedBy : user._id,
                        deleteType
                    },
                    { new : true }
                ).populate('user').populate('deletedBy').exec();

                return NextResponse.json({
                    success : true,
                    message : 'Message successfully deleted for everyone',
                    data : message
                }, {
                    status : 200
                })
            } else {
                return NextResponse.json({
                    success : true,
                    message : 'Cannot delete this message for everyone',
                }, {
                    status : 404
                })
            }
        }

        message = await Message.findByIdAndUpdate(
            message._id,
            {
                deletedBy : user._id,
                deleteType
            }
        ).populate('user').populate('deletedBy').exec();

        return NextResponse.json({
            success : true,
            message : 'Message deleted for you successfully',
            data : message
        }, {
            status : 200
        })
    } catch (err : any) {
        return NextResponse.json({
            success : false,
            message : 'Somrthing went wrong while deleting message',
            error : err.message
        }, {
            status : 500
        })
    }
}