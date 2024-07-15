import dbConnect from '@/lib/dbConnect';
import Order from '@/models/orderModel';
import {NextRequest , NextResponse} from 'next/server';
import  {getToken} from 'next-auth/jwt'

export async function POST(req : NextRequest) {
    await dbConnect();
    try {
        const {id} = await req.json();
        const token =  await getToken({req});
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
            await order.populate('items orderBy');
        } else if(order.status === 'Cancelled') {
            await order.populate('items orderBy cancelledBy cancelledOn');
        } else if(order.status === 'Rejected') {
            await order.populate('items orderBy rejectedOn rejectedBy');
        } else if(order.status === 'Accepted') {
            await order.populate('items orderBy acceptedBy acceptedOn');
        } else if(order.status === 'Delivered') {
            await order.populate('items orderBy acceptedOn acceptedBy deliveredOn deliveredBy');
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