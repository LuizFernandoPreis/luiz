'use server'

import { db } from '@/lib/db'
import { Vaga, Prisma } from '@prisma/client'

export const findManyAction = async ({
  where,
}: {
  where?: Pick<Prisma.VagaWhereInput, 'empresaId'>
}): Promise<{
  data: Vaga[]
}> => {
  const favoritos = await db.vaga.findMany({
    where,
    orderBy: { id: 'asc' },
  })

  return { data: favoritos }
}