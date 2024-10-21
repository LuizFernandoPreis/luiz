import { z } from "zod";
import { VagaSchema } from "./schema";
import { ActionState } from "@/lib/safe-action";
import { Vaga } from "@prisma/client";
import { db } from "@/lib/db";

type InputType = z.infer<typeof VagaSchema>;
type ReturnType = ActionState<InputType, Vaga>;

export const createAction = async (data: InputType): Promise<ReturnType> => {
   const {  titulo, modalidade, descricao, senioridade, contatacao, empresaId, local} = data;

   try {
     const vaga = await db.vaga.create({ data: { titulo, modalidade, descricao, senioridade, contatacao, empresaId, local} });
     return { data: vaga };
   } catch (err) {
     return {
       error: `Ocorreu um erro ao criar, tente novamente mais tarde ${err}`,
     };
   }
};
