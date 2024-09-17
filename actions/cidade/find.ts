'use server'

import { db } from '@/lib/db'
import { Prisma, Cidade } from '@prisma/client'

export const findAction = async ({
  where,
}: {
  where: Pick<Prisma.CidadeWhereInput, 'id'>
}): Promise<{
  data: Cidade | null
}> => {
  const user = await db.cidade.findUnique({
    where: where as Prisma.CidadeWhereUniqueInput,
  })

  return { data: user }
}
