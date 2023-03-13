import NextAuth from "next-auth";
import TwitterProbider from 'next-auth/providers/twitter'

export default NextAuth ({
    providers: [
        TwitterProbider({
            clientId: process.env.TWITTER_CLIENT_ID || "",
            clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
            version: "2.0"
        })
    ]
})