import dbConnect from "@/lib/dbConnect";
import Order from "@/models/orderModel";
import User from "@/models/userModel";
import Cart from "@/models/cartModel";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Profile from "@/models/profileModel";

export async function POST(req : NextRequest) {
    await dbConnect();
    //while creating order fetch details from the cart
    try {
        const token = await getToken({req});
        const orderBy = token!._id;
        const cartId = token!.myCart;
        const {additionalInfo} = token!;

        const {deliveryPrice, shippingAddress} = await req.json();

        const cart = await Cart.findById(cartId);
        if(!cart) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with valid cartId to fetch order details'
            }, {
                status : 404
            })
        }

        
        const {items , totalAmount , quantityOfItem} = cart;

        if(items.length === 0) {
            return NextResponse.json({
                success : false,
                message : 'Please add items in cart to continue',
            }, {
                status : 404
            })
        }

        let address = shippingAddress;

        if(!shippingAddress) {
            const  profile = await Profile.findById(additionalInfo);
            address = profile!.defaultAddress;
        }

        if(!address) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with a addressId to deliver your order'
            }, {
                status : 400
            })
        }


        const order = await Order.create(
            {
                items , orderBy , amount : totalAmount, quantityOfItem,
                shippingAddress : address  , orderedOn : new Date(Date.now())
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