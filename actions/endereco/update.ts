"use server";

import { db } from "@/lib/db";
import { dashboardRoute } from "@/lib/routes";
import { ActionState, safeAction } from "@/lib/safe-action";
import { Endereco } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { EndUpdateSchema } from "./schema";

type InputType = z.infer<typeof EndUpdateSchema>;
type ReturnType = ActionState<InputType, Endereco>;

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, cep, logradouro, rua, bairro, cidadeId, clienteId } = data;

  let user;

  try {
    const existingUf = await db.endereco.findUnique({ where: { id } });

    if (!existingUf) return { error: "UF não encontrada" };

    user = await db.endereco.update({
      where: { id },
      data: { cep, logradouro, rua, bairro, cidadeId, clienteId },
    });
  } catch {
    return {
      error: "Ocorreu um erro ao atualizar, tente novamente mais tarde",
    };
  }

  revalidatePath(dashboardRoute);

  return { data: user };
};

export const updateAction = safeAction(EndUpdateSchema, handler);
