'use server'

import { db } from '@/lib/db'
import { Prisma, Cidade } from '@prisma/client'

export const deleteAction = async ({
  where,
}: {
  where: Pick<Prisma.CidadeWhereUniqueInput, 'id'>
}): Promise<{
  data: Cidade | null
}> => {
  const user = await db.cidade.delete({
    where: where as Prisma.CidadeWhereUniqueInput,
  })

  return { data: user }
}
