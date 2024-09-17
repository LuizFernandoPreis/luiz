"use server";

import { db } from "@/lib/db";
import { Cidade } from "@prisma/client";
import { z } from "zod";
import { ActionState, safeAction } from "@/lib/safe-action";
import { CidadeSchema } from "./schema";

type InputType = z.infer<typeof CidadeSchema>;
type ReturnType = ActionState<InputType, Cidade>;

const handler = async (data: InputType): Promise<ReturnType> => {
  const { nome, uf } = data;

  try {
    const newcidade = await db.cidade.create({
      data: { nome, uf },
    });

    return { data: newcidade };
  } catch (err) {
    console.error(err);
    return { error: "Erro ao criar Cidade" };
  }
};

export const createAction = safeAction(CidadeSchema, handler);