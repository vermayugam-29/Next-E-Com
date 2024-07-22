import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt';
import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";
import { redirect } from "next/navigation";
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
                        {
                            email: credentials.email
                        }
                    );


                    if (!user) {
                        throw new Error(`No user found with ${credentials.email}`);
                    }

                    if (user.deleteAccountDate !== null) {
                        redirect(`/reactivate-acc/${user._id}`);
                        throw new Error(`Your account has been deactivated. 
                            Please reactivate your account to continue`);
                    }

                    if (await compare(credentials.password, user.password)) {
                        const newUser = 
                        // user.populate('additionalInfo');
                         await User.findById(user._id)
                        .populate('additionalInfo').exec();
                        return newUser;
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
                token.accountType = user.accountType;
                token.myCart = user.myCart?.toString();
                token.myOrders = user.myOrders;
                token.additionalInfo = user.additionalInfo;
                token.name = user.name;
                token.chat = user.chat;
                token.profilePhoto = user.additionalInfo?.profilePhoto;
            }


            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.accountType = token.accountType;
                session.user.myCart = token.myCart;
                session.user.myOrders = token.myOrders;
                session.user.additionalInfo = token.additionalInfo;
                session.user.name = token.name;
                session.user.chat = token.chat;
                session.user.profilePhoto = token.profilePhoto;
            }

            return session;
        }
    },
    pages: {
        signIn : 'login',
    },
    session: {
        strategy : 'jwt'
    },
    jwt: {
        secret : process.env.NEXTAUTH_SECRET
    },
    secret : process.env.NEXTAUTH_SECRET,
}


