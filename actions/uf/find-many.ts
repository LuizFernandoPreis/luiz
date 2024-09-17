'use server'

import { db } from '@/lib/db'
import { Prisma, UF } from '@prisma/client'

export const findManyAction = async ({
  where,
}: {
  where?: Pick<Prisma.UFWhereInput, 'uf'>
}): Promise<{
  data: UF[]
}> => {
  const ufs = await db.uF.findMany({
    where,
    orderBy: { uf: 'asc' },
  })

  return { data: ufs }
}