import mongoose, { Schema, Document } from 'mongoose';


export interface ADDRESS extends Document {
    houseNo: string,
    landmark: string,
    city: string,
    state: string,
    pincode: number
}

export const addressSchema: Schema<ADDRESS> = new mongoose.Schema({
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