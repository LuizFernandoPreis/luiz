"use server";

import { db } from "@/lib/db";
import { dashboardRoute } from "@/lib/routes";
import { ActionState, safeAction } from "@/lib/safe-action";
import { Cidade } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CidadeUpdateSchema } from "./schema";

type InputType = z.infer<typeof CidadeUpdateSchema>;
type ReturnType = ActionState<InputType, Cidade>;

const handler = async (data: InputType): Promise<ReturnType> => {
  const { nome, uf, id } = data;
  console.log(data)

  let user;

  try {
    const existingUf = await db.cidade.findUnique({ where: { id } });

    if (!existingUf) return { error: "Cidade não encontrada" };

    user = await db.cidade.update({
      where: { id },
      data: { nome, uf },
    });
  } catch {
    return {
      error: "Ocorreu um erro ao atualizar, tente novamente mais tarde",
    };
  }

  revalidatePath(dashboardRoute);

  return { data: user };
};

export const updateAction = safeAction(CidadeUpdateSchema, handler);
