"use server";

import { db } from "@/lib/db";
import { UF } from "@prisma/client";
import { z } from "zod";
import { ActionState, safeAction} from "@/lib/safe-action";
import { UfSchema } from "./schema";

type InputType = z.infer<typeof UfSchema>;
type ReturnType = ActionState<InputType, UF>;

const handler = async (data: InputType): Promise<ReturnType> => {
  const { uf, aliqInt, aliqSC, freCap, freInt} = data;

  try {
    if (await db.uF.findUnique({ where: { uf } })) {
      return { error: "UF já cadastrada" }; 
    }

    const newUf = await db.uF.create({
      data: { uf, aliqInt, aliqSC, freCap, freInt},
    });

    return { data: newUf }; 
  } catch (err) {
    console.error(err); 
    return { error: "Erro ao criar UF" }; 
  }
};

export const createAction = safeAction(UfSchema, handler)