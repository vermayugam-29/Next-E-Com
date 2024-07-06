import dbConnect from "@/lib/dbConnect";
import Item from "@/models/itemModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req : NextRequest) {
    await dbConnect();
    try {
        const {itemId} = await req.json();
        const item = await Item.findById(itemId);
        if(!item) {
            return NextResponse.json({
                success : false,
                message : 'No such Item found',
            },{
                status : 404
            })
        }
        const deletedItem = await Item.findByIdAndUpdate(
            {itemId},
            {deleted : true},
            {new : true}
        )

        return NextResponse.json({
            success : true,
            message : 'Item deleted successfully',
            data : deletedItem
        },{
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Error deleting item',
            error : error.message
        },{
            status : 500
        })
    }
}