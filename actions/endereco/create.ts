"use server";

import { db } from "@/lib/db";
import { Endereco } from "@prisma/client";
import { z } from "zod";
import { ActionState, safeAction} from "@/lib/safe-action";
import { EndSchema } from "./schema";

type InputType = z.infer<typeof EndSchema>;
type ReturnType = ActionState<InputType, Endereco>;

const handler = async (data: InputType): Promise<ReturnType> => {
  const { cep, logradouro, rua, bairro, cidadeId, clienteId } = data;

  try {
    const newEnd = await db.endereco.create({
      data: { cep, logradouro, rua, bairro, cidadeId, clienteId},
    });

    return { data: newEnd }; 
  } catch (err) {
    console.error(err); 
    return { error: "Erro ao criar Endereco" }; 
  }
};

export const createAction = safeAction(EndSchema, handler)