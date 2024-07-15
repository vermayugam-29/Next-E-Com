import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Address from "@/models/addressModel";

export async function PUT(req : NextRequest) {
    await dbConnect();

    try {
        const {addressId , houseNo , landmark , city , state , pincode , name , phoneNumber} 
        = await req.json();


        if(!addressId) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with an address id to update your address'
            },{
                status : 400
            })
        }

        const address = await Address.findById(addressId);
        if(!address) {
            return NextResponse.json({
                success : false,
                message : 'No such address found'
            },{
                status : 404
            }) 
        }

        if(address.deleted) {
            return NextResponse.json({
                success : false,
                message : 'This address was deleted by you please add it again to edit'
            }, {
                status : 404
            })
        }

        if(name) {
            address.name = name;
        }
        if(phoneNumber) {
            address.phoneNumber = phoneNumber;
        }
        if(houseNo) {
            address.houseNo = houseNo;
        }
        if(landmark) {
            address.landmark = landmark;
        }
        if(city) {
            address.city = city
        }
        if(state) {
            address.state = state
        }
        if(pincode) {
            address.pincode = pincode;
        }

        await address.save();

        return NextResponse.json({
            success : true,
            message : 'Address updated successfully',
            data : address
        } , {
            status : 200
        })
    } catch (err : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while updating tour address',
            error : err.message
        } , {
            status : 500
        })
    }
}