import { z } from 'zod'

export const CursoSchema = z.object({
    id: z.number({ required_error: 'O id é obrigatório' }),
})

