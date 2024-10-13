import { z } from "zod";
import { CursoSchema } from "./schema";
import { ActionState } from "@/lib/safe-action";
import { curso } from "@prisma/client";
import { db } from "@/lib/db";

type InputType = z.infer<typeof CursoSchema>;
type ReturnType = ActionState<InputType, curso>;

export const createAction = async (data: InputType): Promise<ReturnType> => {
  const { id } = data;

  try {
    if (await db.curso.findUnique({ where: { id: data.id } }))
      return { error: "Curso já cadastrado" };
    const curso = await db.curso.create({ data: { id } });
    return { data: curso };
  } catch (err) {
    return {
      error: `Ocorreu um erro ao criar, tente novamente mais tarde ${err}`,
    };
  }
};
