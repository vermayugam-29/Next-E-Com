import dbConnect from "@/lib/dbConnect";
import Order from "@/models/orderModel";
import User from "@/models/userModel";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const { id } = await req.json();

        const token = await getToken({req});
        const userId = token?._id;

        if(!userId) { 
            return NextResponse.json({
                success : false,
                message : 'Please login to continue'
            },{
                status : 404
            })
        }



        if(!id) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with order id to accept order'
            },{
                status : 400
            })
        }

        //use token to check which of the admins have accepted the request
        const findOrder = await Order.findById(id);
        if (!findOrder) {
            return NextResponse.json({
                success: false,
                message: 'No such order found'
           } , { 
            status : 400
           })
        }

        //check if already been accepted
        if(findOrder.status === 'Accepted') {
            const findUser = await User.findById(findOrder.acceptedBy);
            return NextResponse.json({
                success : false,
                message : `Order has already been accepted by ${findUser?.name}`,
            } , {
                status :406
            })
        }

        //check if already been cancelled by the user
        if(findOrder.status === 'Cancelled'){
            return NextResponse.json({
                success : false,
                message : 'Order has already been cancelled by user , you can no longer reject it'
            } , {
                status : 404
            })
        }

        //check if already delivered
        if(findOrder.status === 'Delivered'){
            return NextResponse.json({
                success : false,
                message : 'Order has already been delivered to user'
            } , {
                status : 404
            })
        }

        //check if someone has already rejected the order
        if(findOrder.status === 'Rejected') {
            const findUser = await User.findById(findOrder.rejectedBy);
            return NextResponse.json({
                success : false,
                message : `Order has already been rjected by ${findUser?.name}`
            },{
                status : 404
            })
        }

        findOrder.status = 'Accepted';
        findOrder.acceptedOn = new Date(Date.now());
        //add accepted by using token
        findOrder.acceptedBy = userId;
        await findOrder.save().then(order => order.populate('orderBy acceptedBy'));

        return NextResponse.json({
            success : true,
            message : 'Order has successfully been accepted by you',
            data : findOrder
        }, {
            status : 200
        })

    } catch (error : any) {
        return NextResponse.json({
            success : true,
            message : 'Something went wrong while accepting the order please try again later',
            error : error.message
        },{
            status : 500
        })
    }
}