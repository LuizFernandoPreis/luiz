'use server'

import { db } from '@/lib/db'
import { Prisma, Vaga } from '@prisma/client'

export const findAction = async ({
  where,
}: {
  where: Pick<Prisma.VagaWhereUniqueInput, 'id'>
}): Promise<{
  data: Vaga | null
}> => {
  const user = await db.vaga.findUnique({
    where: where as Prisma.VagaWhereUniqueInput,
  })

  return { data: user }
}
