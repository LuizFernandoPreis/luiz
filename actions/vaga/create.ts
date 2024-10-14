import { z } from "zod";
import { VagaSchema } from "./schema";
import { ActionState } from "@/lib/safe-action";
import { Vaga } from "@prisma/client";
import { db } from "@/lib/db";

type InputType = z.infer<typeof VagaSchema>;
type ReturnType = ActionState<InputType, Vaga>;

// export const createAction = async (data: InputType): Promise<ReturnType> => {
// //   const { id } = data;

// //   try {
// //     if (await db.vaga.findUnique({ where: { id: data.id } }))
// //       return { error: "Curso já cadastrado" };
// //     const curso = await db.vaga.create({ data: { id } });
// //     return { data: curso };
// //   } catch (err) {
// //     return {
// //       error: `Ocorreu um erro ao criar, tente novamente mais tarde ${err}`,
// //     };
// //   }
// };
