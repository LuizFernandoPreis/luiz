'use server'

import { db } from '@/lib/db'
import { Prisma, Endereco } from '@prisma/client'

export const findAction = async ({
  where,
}: {
  where: Pick<Prisma.EnderecoWhereInput, 'id'>
}): Promise<{
  data: Endereco | null
}> => {
  const user = await db.endereco.findUnique({
    where: where as Prisma.EnderecoWhereUniqueInput,
  })

  return { data: user }
}
