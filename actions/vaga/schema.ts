import { z } from 'zod'

export const VagaSchema = z.object({
    id: z.number({ required_error: 'O id é obrigatório' }),
})

