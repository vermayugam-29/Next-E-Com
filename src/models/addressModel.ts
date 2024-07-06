import mongoose, { Schema, Document } from 'mongoose';
import { USER } from './userModel';
import { string } from 'zod';


export interface ADDRESS extends Document {
    user: USER,
    houseNo: string,
    landmark: string,
    city: string,
    state: string,
    pincode: number
}

const addressSchema: Schema<ADDRESS> = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    }
})

const Address = mongoose.models.Address as mongoose.Model<ADDRESS> ||
                mongoose.model('Address', addressSchema);

export default Address;