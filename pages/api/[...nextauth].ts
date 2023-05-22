import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
//http://localhost:3000/api/signout
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  // session: {
  //   jwt: true
  // },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)