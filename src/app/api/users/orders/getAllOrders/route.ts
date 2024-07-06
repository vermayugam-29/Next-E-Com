import dbConnect from "@/lib/dbConnect";
import Order from "@/models/orderModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    await dbConnect();
    try {
        const token = await getToken({req});
        const userId = token?._id;
        const role = token?.accountType;

        if(!userId || role) { 
            return NextResponse.json({
                success : false,
                message : 'Please login to continue'
            },{
                status : 404
            })
        }
        
        let orders;
        if(role === 'Admin') {
            orders = await Order.find({});
        } else if(role === 'Customer') {
            orders = await Order.find({orderBy : userId});
        }


        return NextResponse.json({
            success : true,
            message : 'Orders fetched successfully',
            data : orders
        },{
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while fetching orders',
            error : error.message
        }, {
            status : 500
        })
    }
}