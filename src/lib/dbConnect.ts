import mongoose from 'mongoose';
import dotenv from 'dotenv';

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
