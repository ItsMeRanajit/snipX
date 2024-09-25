
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
// import GitHub from 'next-auth/providers/github'/
import {connectDB} from '@utils/database'
import User from '@models/user'

// console.log({
//     clientId: process.env.AUTH_GOOGLE_ID,
//     clientSecret : process.env.AUTH_GOOGLE_SECRET
// })

const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret : process.env.AUTH_GOOGLE_SECRET,
        })
    ],
    callbacks : {
        async session({session}){
            const sessionUser = await User.findOne({
                email : session.user.email
            })
            session.user.id = sessionUser.id.toString();
            return session;
        },
        async signIn({profile}){ 
            try{
                await connectDB();
                //check if a user exists
                const userExists = await User.findOne({
                    email : profile.email
                });
                //if not create one
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(/\s/g,"").toLowerCase(),
                        image:profile.picture
                    })
                }
    
                return true;
            } catch(error){
                console.log(error)
                return false
            }
        }
    },
   
})

export {handler as GET, handler as POST}