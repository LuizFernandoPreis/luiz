'use server'

import { db } from '@/lib/db'
import { Vaga, Prisma } from '@prisma/client'

export const findAllAction = async () => {
  const vagas = await db.vaga.findMany({})

  return { vagas }
}
