import dbConnect from "@/lib/dbConnect";
import Order from "@/models/orderModel";
import User from "@/models/userModel";
import { getToken } from "next-auth/jwt";
import { NextRequest , NextResponse } from "next/server";

export async function PUT(req : NextRequest) {
    await dbConnect();
    try {
        const {id} = await req.json();

        const token = await getToken({req});
        const userId =token?._id;

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
        const order = await Order.findById(id);
        if(!order) {
            return NextResponse.json({
                success : false,
                message : 'No such order found'
            },{
                status : 404
            })
        }

        //status checks------------------------------------------------------------------------
        if(order.status === 'Accepted'){
            const user = await User.findById(order.acceptedBy);
            return NextResponse.json({
                success : false,
                message : `Order has already been accepted by ${user?.name}`
            } ,{
                status : 404
            })
        }
        if(order.status === 'Cancelled'){
            return NextResponse.json({
                success : false,
                message : 'Order has already been cancelled by user , you can no longer reject it'
            } , {
                status : 404
            })
        }
        if(order.status === 'Delivered'){
            return NextResponse.json({
                success : false,
                message : 'Order has already been delivered to user'
            } , {
                status : 404
            })
        }

        if(order.status === 'Rejected') {
            const user = await User.findById(order.rejectedBy);
            return NextResponse.json({
                success : false,
                message : `Order has already been rjected by ${user?.name}`
            },{
                status : 404
            })
        }
        //status checks-------------------------------------------------------------------

        order.status = 'Rejected';
        order.rejectedOn = new Date(Date.now());
        order.rejectedBy = userId;

        await order.save().then(order => order.populate('orderBy'));

        return NextResponse.json({
            success : true,
            message : 'Order has successfully been rejected',
            data : order
        },{
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while rejecting order',
            error : error.message
        },{
            status : 500
        })
    }
}