import dbConnect from "@/lib/dbConnect";
import Item from "@/models/itemModel";
import Order from "@/models/orderModel";
import User from "@/models/userModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req : NextRequest) {
    await dbConnect();

    try {
        const {id} = await req.json();

        const token = await getToken({req});
        const userId = token!._id;

        if(!id) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with a id',
            }, {
                status : 400
            })
        }

        const order = await Order.findById(id);
        if (!order) {
            return NextResponse.json({
                success: false,
                message: 'No such order found please provide with a valid id',
            }, {
                status: 404
            })
        }

         //status checks------------------------------------------------------------------------
        if (order.status === 'Cancelled') {
            return NextResponse.json({
                success: false,
                message: 'Order has already been cancelled by the user'
            }, {
                status: 404
            })
        }
        if (order.status === 'Delivered') {
            return NextResponse.json({
                success: false,
                message: 'Order has already been delivered'
            }, {
                status: 404
            })
        }

        if (order.status === 'Rejected') {
            const findUser = await User.findById(order.rejectedBy);
            return NextResponse.json({
                success: false,
                message: `Order has been been rjected by ${findUser?.name}`
            }, {
                status: 404
            })
        }
        if (order.status !== 'Accepted') {
            return NextResponse.json({
                success : false,
                message : 'Order first needs to be accepted to be delivered'
            }, {
                status : 404
            })
        }
        //status checks-------------------------------------------------------------------

        order.status = 'Delivered';
        order.deliveredOn = new Date(Date.now());
        order.deliveredBy = userId!;

        await order.save();

        const items = order.items;

        //as soon as order is delivered add increment the sold count to what it was before
        for(const item of items) {
            await Item.findByIdAndUpdate(
                item,
                {$inc : {soldCount : 1}},
                {new : true}
            )
        }


        return NextResponse.json({
            success : true,
            message : 'Order deivered successfully',
            data : order
        },{
            status : 200
        })

    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while updating delivery status please try again later',
            error : error.message
        },{
            status : 500
        })
    }
}