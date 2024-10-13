'use server'

import { db } from '@/lib/db'
import { Favoritos, Prisma } from '@prisma/client'

export const findManyAction = async ({
  where,
}: {
  where?: Pick<Prisma.FavoritosWhereInput, 'id' | 'usuarioId'>
}): Promise<{
  data: Favoritos[]
}> => {
  const favoritos = await db.favoritos.findMany({
    where,
    orderBy: { id: 'asc' },
  })

  return { data: favoritos }
}