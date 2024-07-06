import dbConnect from "@/lib/dbConnect";
import { itemValidation } from "@/schemas/itemSchema";
import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/itemModel";
import { uploadHelper } from "@/utils/cloudinaryHelper";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const { name, price, stockAvailable, description } = itemValidation.parse(req.json());

        const findItem = await Item.findOne({name});
        if(findItem) {
            return NextResponse.json({
                success : false,
                message : 'There already exists a item with same name',
            },{
                status : 400
            })
        }

        //cloudinary upload code------------------------------------------------
        const res = uploadHelper(req);
        //---------------------------------------------------------------------------\

        const item = await Item.create(
            {
                name , mainImage : res,
                price , stockAvailable , description
            }
        );

        return NextResponse.json({
            success : true,
            message : 'Successfully created new item',
            data : item
        },{
            status : 200
        })
    } catch (error: any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while creating new item',
            error : error.message
        },{
            status : 500
        })
    }
}