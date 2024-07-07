import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Address from "@/models/addressModel";

export async function GET(req : NextRequest) {
    await dbConnect();

    try {
        const {addressId} = await req.json();

        if(!addressId) {
            return NextResponse.json({
                success : false,
                message : 'Please provide a address id to fetch address details'
            } , {
                status : 400
            })
        }

        const address = await Address.findById(addressId);

        if(!address) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with a valid address id'
            } , {
                status : 404
            })
        }

        return NextResponse.json({
            success : true,
            message : 'Address details fetched successfully',
            data : address
        },{
            status : 200
        })
    } catch (err :any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while fetching address',
            error : err.message
        } , {
            status : 500
        })
    }
}