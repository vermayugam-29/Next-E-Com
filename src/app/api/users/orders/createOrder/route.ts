import dbConnect from "@/lib/dbConnect";
import Order from "@/models/orderModel";
import User from "@/models/userModel";
import { orderValidation } from "@/schemas/orderSchema";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req : NextRequest) {
    await dbConnect();
    try {
        const {items  , amount} = orderValidation.parse(await req.json());
        //remove order by from zod validations
        const {deliveryPrice, shippingAddress} = await req.json();
        
        const token = await getToken({req});
        const orderBy = token?._id;

        if(!orderBy) { 
            return NextResponse.json({
                success : false,
                message : 'Please login to continue'
            },{
                status : 404
            })
        }
        if(!shippingAddress) {{
            return NextResponse.json({
                success : false,
                message : 'Please provide a address for order to be delivered on it'
            } , {
                status : 404
            })
        }}
        



        const order = await Order.create(
            {
                items , orderBy , amount,
                shippingAddress  , orderedOn : new Date(Date.now())
            }
        );

        


        const admins = await User.find({accountType : 'Admin'});
        let adminEmails : string[] = [];


        for(const admin of admins) {
            await User.findByIdAndUpdate(
                {_id : admin._id},
                {$push : {myOrders : order._id}},
                {new : true}
            )
            adminEmails.push(admin.email);
        }

        if(deliveryPrice){
            order.deliveryPrice = deliveryPrice;
        }

        order.orderTo = adminEmails;
        await order.save().then(order => order.populate('orderBy'));

        await User.findByIdAndUpdate(
            {_id : orderBy},
            {$push : {myOrders : order._id}},
            {new : true}
        );


        //send mail to admins whenever order is created
        //handle that later => handled in order model using post hook

        return NextResponse.json({
            success : true,
            message : 'Successfully created order , Please wait for admins to accept the order',
            data : order
        } , {
            status : 200
        });
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while creating order',
            error : error.message
        },{
            status : 500
        })
    }
}