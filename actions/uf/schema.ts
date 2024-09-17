import { z } from 'zod'

const ufSchema = z.object({
  id: z.string({ required_error: 'O id é obrigatório' }),
})

export const UfSchema = z.object({
  uf: z
    .string({ required_error: 'O nome é obrigatório' })
    .min(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
    .max(2, { message: 'O nome deve ter no máximo 2 caracteres' }),

    aliqInt: z
    .number({ required_error: 'O campo AliqInt é obrigatório' })
    .min(0, {message: 'Valor mínimo é 0' })
    .max(50, { message: 'O campo aliqInt deve possuir no máximo 50 caracteres' }),

    aliqSC: z
    .number({ required_error: 'O campo AliqSC é obrigatório' })
    .min(0, {message: 'Valor mínimo é 0' })
    .max(50, { message: 'O campo aliqSC deve possuir no máximo 50 caracteres' }),

    freCap: z
    .number({ required_error: 'O campo freteCap é obrigatório' })
    .min(0, {message: 'Valor mínimo é 0'})
    .max(50, { message: 'O campo freteCap deve possuir no máximo 50 caracteres' }),

    freInt: z
    .number({ required_error: 'O campo freteInt é obrigatório' })
    .min(0, {message: 'Valor mínimo é 0' })
    .max(50, { message: 'O campo freteInt deve possuir no máximo 50 caracteres' }),

    capitalId: z
    .number()
    .int()
})


export const UfUpsertSchema = z.discriminatedUnion('new', [
  z.object({ new: z.literal(true) }).merge(UfSchema)
])
