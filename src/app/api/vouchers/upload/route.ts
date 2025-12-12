import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { parse } from 'csv-parse/sync'
import { encrypt } from '@/lib/crypto'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !(session.user && (session.user as any).isAdmin)) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const body = await req.text()
  const records = parse(body, { columns: true, skip_empty_lines: true }) as any[]
  const uploader = await prisma.user.findUnique({ where: { discordUserId: (session.user as any).discordUserId } })
  const toCreate = records.map(r => ({
    codeCiphertext: encrypt(String(r.code)),
    valueAmount: parseInt(String(r.value_amount || r.amount || 0), 10),
    currency: String(r.currency || 'USD'),
    status: 'available' as const,
    uploadedByAdminId: uploader?.id || null
  }))
  await prisma.voucher.createMany({ data: toCreate })
  return NextResponse.json({ created: toCreate.length })
}

