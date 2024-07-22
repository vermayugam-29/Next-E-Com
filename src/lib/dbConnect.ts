import mongoose from 'mongoose';
import dotenv from 'dotenv';


import '@/models/userModel';
import '@/models/itemModel';
import '@/models/cartModel';
import '@/models/ratingsModel';
import '@/models/orderModel';
import '@/models/otpModel';
import '@/models/profileModel';
import '@/models/addressModel';
import '@/models/chatModel';
import '@/models/messageModel.';

dotenv.config();

interface ConnectedObject {
    isConnected: boolean;
}

let connection: ConnectedObject = {
    isConnected: false,
};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log('Already connected to database');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URL!, {
        });

        connection.isConnected = db.connections[0].readyState === 1;

        console.log('DB connected successfully');
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
}

export default dbConnect;
