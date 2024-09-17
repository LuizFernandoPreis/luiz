'use server'

import { db } from '@/lib/db'
import { Prisma, Cidade } from '@prisma/client'

export const findManyAction = async ({
  where,
}: {
  where?: Pick<Prisma.CidadeWhereInput, 'uf'>
}): Promise<{
  data: Cidade[]
}> => {
  const ufs = await db.cidade.findMany({
    where,
    orderBy: { uf: 'asc' },
  })

  return { data: ufs }
}