"use server";

import { db } from "@/lib/db";
import { Cliente } from "@prisma/client";
import { z } from "zod";
import { ActionState, safeAction } from "@/lib/safe-action";
import { ClienteSchema } from "./schema";

type InputType = z.infer<typeof ClienteSchema>;
type ReturnType = ActionState<InputType, Cliente>;

const handler = async (data: InputType): Promise<ReturnType> => {
  const { nome, telefone, celular, cpf, rg, email } = data;

  try {
    if (await db.cliente.findUnique({ where: { cpf } })) {
      return { error: "Cliente já cadastrado!" };
    }

    const newUf = await db.cliente.create({
      data: { nome, telefone, celular, cpf, rg, email },
    });

    return { data: newUf };
  } catch (err) {
    console.error(err);
    return { error: "Erro ao cadastrar Cliente!" };
  }
};

export const createAction = safeAction(ClienteSchema, handler);
