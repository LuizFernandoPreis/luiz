import { z } from "zod";

export const EndSchema = z.object({
  cep: z
    .string({ required_error: "O nome é obrigatório" })
    .min(8, { message: "O nome deve ter no mínimo 8 caracteres" })
    .max(8, { message: "O nome deve ter no máximo 8 caracteres" }),

  logradouro: z
    .string({ required_error: "O celular é obrigatório" })
    .min(4, { message: "O nome deve ter no mínimo 4 caracteres" })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" }),

  rua: z
    .string({ required_error: "O cpf é obrigatório" })
    .min(4, { message: "O nome deve ter no mínimo 2 caracteres" })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" }),

  bairro: z
    .string({ required_error: "O rg é obrigatório" })
    .min(4, { message: "O nome deve ter no mínimo 4 caracteres" })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" }),

  cidadeId: z.number().int(),

  clienteId: z.number().int(),
});

export const EndUpdateSchema = z.object({
  id: z
  .number({required_error: "É necessário passar o id no body da requisição"})
  .int(),

  cep: z
    .string({ required_error: "O nome é obrigatório" })
    .min(8, { message: "O nome deve ter no mínimo 8 caracteres" })
    .max(8, { message: "O nome deve ter no máximo 8 caracteres" }),

  logradouro: z
    .string({ required_error: "O celular é obrigatório" })
    .min(4, { message: "O nome deve ter no mínimo 4 caracteres" })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" }),

  rua: z
    .string({ required_error: "O cpf é obrigatório" })
    .min(4, { message: "O nome deve ter no mínimo 2 caracteres" })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" }),

  bairro: z
    .string({ required_error: "O rg é obrigatório" })
    .min(4, { message: "O nome deve ter no mínimo 4 caracteres" })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" }),

  cidadeId: z.number().int(),

  clienteId: z.number().int(),
});