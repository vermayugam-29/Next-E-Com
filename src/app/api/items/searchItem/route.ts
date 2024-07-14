import dbConnect from "@/lib/dbConnect";
import Item from "@/models/itemModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    await dbConnect();
    try {
        const {name} = await req.json();

        const items = await Item.find({ name: { $regex: name, $options: "i" } });

        return NextResponse.json({
            success : true,
            message : 'All the items are fetched successfully',
            data : items
        },{
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