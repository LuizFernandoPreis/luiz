import { z } from "zod";
import { FavoritoSchema } from "./schema";
import { Favoritos } from "@prisma/client";
import { ActionState } from "@/lib/safe-action";
import { db } from "@/lib/db";

type InputType = z.infer<typeof FavoritoSchema>;
type ReturnType = ActionState<InputType, Favoritos>;

export const createAction = async (data: InputType): Promise<ReturnType> => {
    const { usuarioId, cursoId } = data;
    
    try {
        const favorito = await db.favoritos.create({ data: { usuarioId, cursoId } });
        return { data: favorito };
    } catch (err) {
        return {
        error: `Ocorreu um erro ao criar, tente novamente mais tarde ${err}`,
        };
    }
};