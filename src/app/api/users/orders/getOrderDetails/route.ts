import dbConnect from '@/lib/dbConnect';
import Order from '@/models/orderModel';
import {NextRequest , NextResponse} from 'next/server';

export async function POST(req : NextRequest) {
    await dbConnect();
    try {
        const {id} = await req.json();
        
        
        if(!id) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with an order id to fetch order details'
            },{
                status : 400
            })
        }

        const order = await Order.findById(id);

        if(!order) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with a valid order id',
            } , {
                status : 400
            })
        }


        if(order.status === 'Pending') {
            await order.populate('items orderBy quantityOfItem.item');
        } else if(order.status === 'Cancelled') {
            await order.populate('items orderBy cancelledBy quantityOfItem.item');
        } else if(order.status === 'Rejected') {
            await order.populate('items orderBy rejectedBy quantityOfItem.item');
        } else if(order.status === 'Accepted') {
            await order.populate('items orderBy acceptedBy quantityOfItem.item');
        } else if(order.status === 'Delivered') {
            await order.populate('items orderBy acceptedBy deliveredBy quantityOfItem.item');
        }
        

        return NextResponse.json({
            success : true,
            message : 'Successfully fetched order details',
            data : order
        } , {
            status : 200
        })

        
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while fetching order details',
            error : error.message
        },{
            status : 500
        })
    }
}