'use server'

import { db } from '@/lib/db'
import { Prisma, Endereco } from '@prisma/client'

export const deleteAction = async ({
  where,
}: {
  where: Pick<Prisma.EnderecoWhereUniqueInput, 'id'>
}): Promise<{
  data: Endereco | null
}> => {
  const user = await db.endereco.delete({
    where: where as Prisma.EnderecoWhereUniqueInput,
  })

  return { data: user }
}
