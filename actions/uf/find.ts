'use server'

import { db } from '@/lib/db'
import { Prisma, UF } from '@prisma/client'

export const findAction = async ({
  where,
}: {
  where: Pick<Prisma.UFWhereInput, 'uf'>
}): Promise<{
  data: UF | null
}> => {
  const user = await db.uF.findUnique({
    where: where as Prisma.UFWhereUniqueInput,
  })

  return { data: user }
}
