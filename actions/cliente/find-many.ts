'use server'

import { db } from '@/lib/db'
import { Prisma, Cliente } from '@prisma/client'

export const findManyAction = async ({
  where,
}: {
  where?: Pick<Prisma.ClienteWhereUniqueInput, 'id'>
}): Promise<{
  data: Cliente[]
}> => {
  const enderecos = await db.cliente.findMany({
    where,
    orderBy: { id: 'asc' },
  })

  return { data: enderecos }
}