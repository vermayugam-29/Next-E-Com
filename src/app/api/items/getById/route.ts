import dbConnect from "@/lib/dbConnect";
import Item from "@/models/itemModel";
import { NextRequest, NextResponse } from "next/server";

export async  function GET(req : NextRequest) {
    await dbConnect();
    try {
        const {itemId} = await req.json();
        if(!itemId) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with an item id to fetch item details'
            },{
                status : 400
            })
        }

        let findItem = await Item.findById(itemId)
        if(!findItem) {
            return NextResponse.json({
                success : false,
                message : 'Item not found please provide with valid id'
            } , {
                status : 404
            })
        }
        if(findItem.deleted){
            return NextResponse.json({
                success : false,
                message : 'This item was removed by the owner you can no longer access it'
            },{
                status : 403
            })
        }

        if(findItem.ratingAndReviews.length !== 0){
            //modify this if necessary
            findItem = await Item.findById(itemId)
                            .populate({
                                path : 'ratingAndReviews',
                                populate : {
                                    path : 'postedBy'
                                }
                            }).exec();
        }

        return NextResponse.json({
            success : true,
            message : 'Successfully fetched item details',
            data : findItem
        },{
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Error fetching item details please try again later',
            error : error.message
        },{
            status : 500
        })
    }
}