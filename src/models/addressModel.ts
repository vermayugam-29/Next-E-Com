import mongoose, { Schema, Document } from 'mongoose';


export interface ADDRESS extends Document {
    name: string,
    phoneNumber : string,
    houseNo: string,
    landmark: string,
    city: string,
    state: string,
    pincode: number,
    deleted : boolean
}

export const addressSchema: Schema<ADDRESS> = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    phoneNumber : {
        type : String,
        required : true,
        trim : true
    },
    houseNo: {
        type: String,
        required: true,
        trim: true
    },
    landmark: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    pincode: {
        type: Number,
        required: true
    },
    deleted : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

const Address = mongoose.models.Address as mongoose.Model<ADDRESS> ||
                mongoose.model('Address', addressSchema);

export default Address;