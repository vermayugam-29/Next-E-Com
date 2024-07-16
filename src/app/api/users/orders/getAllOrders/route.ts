import dbConnect from "@/lib/dbConnect";
import Order from "@/models/orderModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    await dbConnect();
    try {
        const token = await getToken({req});
        const userId = token!._id;
        const role = token!.accountType;


        
        let orders;
        if(role === 'Admin') {
            orders = await Order.find({})
            .populate('items')
            .populate('quantityOfItem.item')
            .populate('orderBy').exec();
        } else if(role === 'Customer') {
            orders = await Order.find({orderBy : userId})
            .populate('items')
            .populate('quantityOfItem.item')
            .populate('orderBy').exec();
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