import dbConnect from "@/lib/dbConnect";
import Item from "@/models/itemModel";
import { uploadHelper } from "@/utils/cloudinaryHelper";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const { itemId, name, mainImage , description, stockAvailable, price } = await req.json();

        if (!itemId) {
            return NextResponse.json({
                success: false,
                message: 'Plese provide with an item id'
            },{
                status : 400
            })
        }

        const findItem = await Item.findOne(
            { item: itemId, deleted: false }
        );

        if (!findItem) {
            return NextResponse.json({
                success: false,
                message: 'No such item found',
            }, {
                status: 404
            })
        }

        if (name) {
            findItem.name = name;
        } 
        if (mainImage) {
            //send mainImage as boolean from frontend
            //run a function for uploading to cloudinary
            const res : any  = uploadHelper(req);
            findItem.mainImage = res;
        }
        if (description) {
            findItem.description = description;
        }
        if (price) {
            findItem.price = price;
        }
        if(stockAvailable) {
            findItem.stockAvailable = stockAvailable;
        }

        await findItem.save();

        return NextResponse.json({
            success : true,
            message : 'Item updated successfully',
            data : findItem
        },{
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Somthing went wrong while updating item please try again later',
            error : error.message
        },{
            status : 500
        })
    }
}