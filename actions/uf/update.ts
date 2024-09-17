"use server";

import { db } from "@/lib/db";
import { dashboardRoute } from "@/lib/routes";
import { ActionState, safeAction } from "@/lib/safe-action";
import { UF } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { UfSchema } from "./schema";

type InputType = z.infer<typeof UfSchema>;
type ReturnType = ActionState<InputType, UF>;

const handler = async (data: InputType): Promise<ReturnType> => {
  const { uf, aliqInt, aliqSC, freCap, freInt, capitalId } = data;

  let user;

  try {
    const existingUf = await db.uF.findUnique({ where: { uf } });

    if (!existingUf) return { error: "UF não encontrada" };

    user = await db.uF.update({
      where: { uf },
      data: { uf, aliqInt, aliqSC, freCap, freInt, capitalId },
    });
  } catch {
    return {
      error: "Ocorreu um erro ao atualizar, tente novamente mais tarde",
    };
  }

  revalidatePath(dashboardRoute);

  return { data: user };
};

export const updateAction = safeAction(UfSchema, handler);
