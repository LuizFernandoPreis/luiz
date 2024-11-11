import { z } from 'zod'

export const VagaSchema = z.object({
    titulo: z.string({ required_error: 'O título é obrigatório' }),
    descricao: z.string({ required_error: 'A descrição é obrigatória' }),
    modalidade: z.string({ required_error: 'A modalidade é obrigatória' }),
    senioridade: z.string({ required_error: 'A senioridade é obrigatória' }),
    contatacao: z.string({ required_error: 'A contratação é obrigatória' }),
    empresaId: z.string({ required_error: 'A empresaId é obrigatória' }),
    requisitos: z.string({ required_error: 'Os requisitos são obrigatórios' }),
    local: z.string({ required_error: 'O local é obrigatório' }),
    salario: z.string(),
})

