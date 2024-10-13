import { z } from 'zod'

export const FavoritoSchema = z.object({
    usuarioId: z.string({ required_error: 'O id de usuario é obrigatório' }),
    cursoId: z.number({ required_error: 'O id de curso é obrigatório' }),
})

