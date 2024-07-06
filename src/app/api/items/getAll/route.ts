import dbConnect from "@/lib/dbConnect";
import Item from "@/models/itemModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    await dbConnect();
    try {
        const items = await Item.find({deleted : false});
        return NextResponse.json({
            success : true,
            message : 'Successfully fetched all the items',
            data : items
        } , {
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while fetching items',
            error : error.message
        },{
            status : 500
        })
    }
}