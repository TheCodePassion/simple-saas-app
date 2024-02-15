import NextAuth from 'next-auth'

import DiscordProvider from 'next-auth/providers/discord'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    DiscordProvider({
      clientId: String(process.env.DISCORD_ID),
      clientSecret: String(process.env.DISCORD_SECRET),
    }),
  ],
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
