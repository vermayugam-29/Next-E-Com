import dbConnect from "@/lib/dbConnect";
import Order from "@/models/orderModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const { id } = await req.json();
        const token = await getToken({req});
        const userId = token!._id;
        
        if (!id) {
            return NextResponse.json({
                success: false,
                message: 'Please provide with an id to cancel order'
            }, {
                status: 400
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
        if (order.status === 'Accepted') {
            return NextResponse.json({
                success: false,
                message: `Order has already been accepted you cannot cancel now , go to help center for more details`
            }, {
                status: 404
            })
        }
        if (order.status === 'Cancelled') {
            return NextResponse.json({
                success: false,
                message: 'Order has already been cancelled by you'
            }, {
                status: 404
            })
        }
        if (order.status === 'Delivered') {
            return NextResponse.json({
                success: false,
                message: 'Order has already been delivered to you'
            }, {
                status: 404
            })
        }

        if (order.status === 'Rejected') {
            return NextResponse.json({
                success: false,
                message: `Order has been been rjected ,
                so no need to cancel it`
            }, {
                status: 404
            })
        }
        //status checks-------------------------------------------------------------------

        order.status = 'Cancelled';
        order.cancelledOn = new Date(Date.now());
        order.cancelledBy = userId!;

        await order.save().then((order) => order.populate('orderBy'));

        return NextResponse.json({
            success : true,
            message : 'Order cancelled successfully',
            data : order
        } , {
            status : 200
        })

    } catch (error: any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while cancelling order please try again later',
            error : error.message
        }, {
            status : 500
        })
    }
}