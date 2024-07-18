
import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface User {
        _id?: string;
        accountType?: string;
        myCart?: string;
        image?: string;
        myOrders?: string[];
        additionalInfo?: {
            profilePhoto?: string;
        };
        name?: string;
        chat?: string[];
    }
    interface Session {
        user: {
            _id?: string;
            accountType?: string;
            myCart?: string;
            image?: string;
            myOrders?: string[];
            additionalInfo?: {
                profilePhoto?: string;
            };
            name?: string;
            chat?: string[];
            profilePhoto?: string;
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string,
        accountType?: string,
        myCart?: string,
        image?: string,
        myOrders?: string[],
        additionalInfo?: {
            profilePhoto?: string;
        },
        name?: string,
        chat?: string[],
        profilePhoto?: string
    }
}