import { z } from "zod";

export const EmpresaSchema = z.object({
    nome: z
      .string()
      .nonempty("O nome é obrigatório")
      .max(100, "O nome deve ter no máximo 100 caracteres"),
    cnpj: z
      .string()
      .nonempty("O CNPJ é obrigatório")
      .length(14, "O CNPJ deve ter 14 caracteres"),
    descricao: z.string().max(500, "A descrição pode ter no máximo 500 caracteres"),
    usuarioId: z.string(),
  });
  
