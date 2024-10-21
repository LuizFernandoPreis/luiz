'use server'

import { db } from '@/lib/db'
import { Vaga, Prisma } from '@prisma/client'

export const findAllAction = async (page = 1, limit = 5) => {
  const skip = (page - 1) * limit;

  const vagas = await db.vaga.findMany({
    skip,
    take: limit,
    orderBy: { id: 'asc' }, 
  });

  const totalCount = await db.vaga.count();

  return { vagas, totalCount };
}
