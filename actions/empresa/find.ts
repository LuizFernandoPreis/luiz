'use server'

import { db } from '@/lib/db'
import { Prisma, Empresa } from '@prisma/client'

export const findAction = async ({
  where,
}: {
  where: Pick<Prisma.EmpresaWhereUniqueInput, 'usuarioId' | 'cnpj' >
}): Promise<{
  data: Empresa | null
}> => {
  const empresa = await db.empresa.findUnique({
    where: where as Prisma.EmpresaWhereUniqueInput,
  })

  return { data: empresa }
}
