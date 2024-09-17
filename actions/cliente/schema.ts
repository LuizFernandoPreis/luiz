import { z } from "zod";

export const ClienteSchema = z.object({
  nome: z
    .string({ required_error: "O nome é obrigatório" })
    .min(2, { message: "O nome deve ter no mínimo 2 caracteres" })
    .max(50, { message: "O nome deve ter no máximo 50 caracteres" }),

  celular: z
    .string()
    .min(9, { message: "O celular deve ter no mínimo 9 caracteres" })
    .max(13, { message: "O celular deve ter no máximo 11 caracteres" }),

  telefone: z
    .string()
    .min(8, { message: "O telefone deve ter no mínimo 8 caracteres" })
    .max(12, { message: "O telefone deve ter no máximo 10 caracteres" }),

  cpf: z
    .string({ required_error: "O CPF é obrigatório" })
    .length(11, { message: "O CPF deve ter exatamente 11 caracteres" }),

  rg: z
    .string()
    .min(9, { message: "O RG deve ter no mínimo 9 caracteres" })
    .max(10, { message: "O RG deve ter no máximo 10 caracteres" }),

  email: z
    .string()
    .email({ message: "O email deve ser um endereço de email válido" })
    .min(5, { message: "O email deve ter no mínimo 5 caracteres" })
    .max(50, { message: "O email deve ter no máximo 50 caracteres" }),
});

export const UfUpsertSchema = z.discriminatedUnion("new", [
  z.object({ new: z.literal(true) }).merge(ClienteSchema),
]);
