'use server'

import { db } from '@/lib/db'
import { Prisma, curso } from '@prisma/client'

export const findAction = async ({
  where,
}: {
  where: Pick<Prisma.cursoWhereUniqueInput, 'id'>
}): Promise<{
  data: curso | null
}> => {
  const curso = await db.curso.findUnique({
    where: where as Prisma.cursoWhereUniqueInput,
  })

  return { data: curso }
}
