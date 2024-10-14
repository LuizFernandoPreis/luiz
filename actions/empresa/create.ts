import { z } from "zod";
import { EmpresaSchema } from "./schema";
import { ActionState } from "@/lib/safe-action";
import { Empresa } from "@prisma/client";
import { db } from "@/lib/db";

type InputType = z.infer<typeof EmpresaSchema>;
type ReturnType = ActionState<InputType, Empresa>;

export const createAction = async (data: InputType): Promise<ReturnType> => {
  const { nome, cnpj, descricao, usuarioId } = data;

  try {
    if (await db.empresa.findUnique({ where: {cnpj: cnpj} }))
      return { error: "Empresa já cadastrada" };
    const empresa = await db.empresa.create({ data: { nome, cnpj, descricao, usuarioId } });
    return { data: empresa };
  } catch (err) {
    return {
      error: `Ocorreu um erro ao criar, tente novamente mais tarde ${err}`,
    };
  }
};
