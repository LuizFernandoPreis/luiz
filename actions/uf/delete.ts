'use server'

import { db } from '@/lib/db'
import { Prisma, UF } from '@prisma/client'

export const deleteAction = async ({
  where,
}: {
  where: Pick<Prisma.UFWhereUniqueInput, 'uf'>
}): Promise<{
  data: UF | null
}> => {
  const user = await db.uF.delete({
    where: where as Prisma.UFWhereUniqueInput,
  })

  return { data: user }
}
