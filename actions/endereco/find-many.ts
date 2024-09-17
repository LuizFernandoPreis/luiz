'use server'

import { db } from '@/lib/db'
import { Prisma, Endereco } from '@prisma/client'

export const findManyAction = async ({
  where,
}: {
  where?: Pick<Prisma.EnderecoWhereInput, 'id'>
}): Promise<{
  data: Endereco[]
}> => {
  const enderecos = await db.endereco.findMany({
    where,
    orderBy: { id: 'asc' },
  })

  return { data: enderecos }
}