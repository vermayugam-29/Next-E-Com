import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt';
import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";
require('dotenv').config();

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({

            name: 'Credentials',

            credentials: {
                email: {
                    label: 'email',
                    type: 'email'
                },
                password: {
                    label: 'password',
                    type: 'password'
                }
            },

            async authorize(credentials: any): Promise<any> {
                await dbConnect();

                try {
                    const user = await User.findOne(
                        { email: credentials.identifier }
                    );

                    if (!user) {
                        throw new Error(`No user found with ${credentials.identifier}`);
                    }

                    if (await compare(credentials.password, user.password)) {
                        return user;
                    } else {
                        throw new Error('Incorrect password');
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            }

        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.accountType = user.accounType;
                token.myCart = user.myCart?.toString();
                token.myOrders = user.myOrders;
                token.additionalInfo = user.additionalInfo
            }


            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.accounType = token.accounType;
                session.user.myCart = token.myCart;
                session.user.myOrders = token.myOrders;
                session.user.additionalInfo = token.additionalInfo
            }

            return session;
        }
    },
    pages: {
        signIn: '/logIn'
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
}