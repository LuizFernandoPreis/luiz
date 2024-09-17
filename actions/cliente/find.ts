'use server'

import { db } from '@/lib/db'
import { Prisma, Cliente } from '@prisma/client'

export const findAction = async ({
  where,
}: {
  where: Pick<Prisma.ClienteWhereUniqueInput, 'id'>
}): Promise<{
  data: Cliente | null
}> => {
  const user = await db.cliente.findUnique({
    where: where as Prisma.ClienteWhereUniqueInput,
  })

  return { data: user }
}
