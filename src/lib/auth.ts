import NextAuth, { NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { prisma } from './prisma'

function isAdminDiscord(id: string) {
  const list = process.env.ADMIN_DISCORD_IDS || ''
  const set = new Set(list.split(',').map(x => x.trim()).filter(Boolean))
  return set.has(id)
}

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const discordId = (profile as any).id as string
        token.discordUserId = discordId
        const username = (profile as any).global_name || (profile as any).username || ''
        const avatarUrl = (profile as any).avatar ? `https://cdn.discordapp.com/avatars/${discordId}/${(profile as any).avatar}.png` : null
        const admin = isAdminDiscord(discordId)
        try {
          await prisma.user.upsert({
            where: { discordUserId: discordId },
            update: { username, avatarUrl: avatarUrl || undefined, isAdmin: admin },
            create: { discordUserId: discordId, username, avatarUrl: avatarUrl || undefined, isAdmin: admin }
          })
        } catch {}
        token.isAdmin = admin
      }
      return token
    },
    async session({ session, token }) {
      ;(session.user as any).discordUserId = (token as any).discordUserId
      ;(session.user as any).isAdmin = (token as any).isAdmin
      return session
    }
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}

export const { handlers: authHandlers } = NextAuth(authOptions)
