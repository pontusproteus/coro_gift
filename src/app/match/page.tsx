import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function MatchPage() {
  const session = await getServerSession(authOptions)
  if (!session) return <div>Login required</div>
  const user = await prisma.user.findUnique({ where: { discordUserId: (session.user as any).discordUserId } })
  if (!user) return <div>No profile</div>
  const activeRound = await prisma.round.findFirst({ where: { isActive: true } })
  if (!activeRound) return <div>No active round</div>
  const match = await prisma.match.findUnique({ where: { roundId_giverUserId: { roundId: activeRound.id, giverUserId: user.id } }, include: { receiver: true } })
  if (!match) return <div>Not matched yet</div>
  return (
    <div className="space-y-4">
      <h2 className="text-2xl">Your recipient</h2>
      <div className="p-4 border rounded">
        <div>{match.receiver.username || 'Discord user'}</div>
        {match.receiver.avatarUrl && (<img src={match.receiver.avatarUrl} alt="avatar" className="w-16 h-16 rounded" />)}
      </div>
    </div>
  )
}

