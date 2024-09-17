import { z } from 'zod'

export const CidadeSchema = z.object({
  nome: z
    .string({ required_error: 'O nome é obrigatório' }),

    uf: z
    .string({ required_error: 'O campo ufId é obrigatório' })
    .min(0, {message: 'Valor mínimo é 0' })
    .max(50, { message: 'O campo aliqInt deve possuir no máximo 50 caracteres' }),
})

export const CidadeUpdateSchema = z.object({
  id: z
    .number({required_error:"É necessário passar o id da cidade"})
    .int(),

  nome: z
    .string({ required_error: 'O nome é obrigatório' }),

    uf: z
    .string({ required_error: 'O campo ufId é obrigatório' })
    .min(0, {message: 'Valor mínimo é 0' })
    .max(50, { message: 'O campo aliqInt deve possuir no máximo 50 caracteres' }),
})