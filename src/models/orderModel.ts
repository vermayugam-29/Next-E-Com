import mongoose, { Schema, Document } from 'mongoose';
import User, { USER , userSchema } from './userModel';
import { ITEM , itemSchema } from './itemModel'
import dotenv from 'dotenv'
import mailSender from '@/utils/mailSender';
import orderDetailTemplate from '../../mailTemplates/orderMail';
import {ADDRESS , addressSchema} from './addressModel';
dotenv.config();
const orderId = require('order-id')(process.env.ORDER_SECRET)

// mongoose.model('User' , userSchema);
// mongoose.model('Item' , itemSchema);
// mongoose.model('Address' , addressSchema);

export interface ORDER extends Document {
    items: ITEM[],
    orderBy: USER | string,
    orderId: string | number,
    orderTo: string[],
    orderedOn: Date,
    amount: string,
    status: string,
    deliveryPrice: string,
    shippingAddress: ADDRESS,
    acceptedOn: Date,
    acceptedBy: USER | string,
    rejectedOn: Date,
    rejectedBy: USER | string,
    cancelledOn: Date,
    cancelledBy: USER | string,
    deliveredOn: Date,
    deliveredBy: USER | string
}

export const orderSchema: Schema<ORDER> = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderTo: [{
        type: String
    }],
    orderId: {
        type: String || Number,
        default: orderId.generate(),
        unique: true
    },
    orderedOn: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    amount: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Delivered', 'Cancelled', 'Rejected'],
        default: 'Pending',
        required: true
    },
    deliveryPrice: {
        type: String,
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    acceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    acceptedOn: {
        type: Date
    },
    rejectedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rejectedOn: {
        tpe: Date
    },
    cancelledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cancelledOn: {
        type: Date
    },
    deliveredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deliveredOn: {
        type: Date
    }
},{
    timestamps : true
});


async function sendOrderEmail(orderBy: any, orderTo: string[], amount: string, items: any) {
    try {
        const user = await User.findById(orderBy);

        const itemsPurchased: string[] = items.map((item: any) => item.name);

        if (!user) {
            console.log(`user dosen't exist error sending email to admin`);
            return;
        }
        for (const admin of orderTo) {
            await mailSender(admin, `Order by ${user.name}`,
                orderDetailTemplate(user.name, itemsPurchased, amount));
        }
        console.log('mail sent successfully to all the admins')
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message)
    }
}

orderSchema.post('save', async function (doc, next) {
    try {
        if (doc.orderTo && doc.orderBy && doc.amount && doc.items) {
            await sendOrderEmail(doc.orderBy, doc.orderTo, doc.amount, doc.items);
        }
        next();
    } catch (error: any) {
        next(error);
    }
});

const Order = mongoose.models.Order as mongoose.Model<ORDER> || mongoose.model('Order', orderSchema);
export default Order