import { db } from "@/lib/db";

type props = {
  id: number;
  userId: string;
  vagaId: number;
}[];

export async function getUsersByIdList( ids: props ) {
  let userList = [];

  for (let i = 0; i < ids.length; i++) {
    const response = await db.usuario.findFirst({
      select: {
        id: true,
        cidade: true,
        curso: true,
        email: true,
        nome: true,
        sobre: true,
        userCapaImage: true,
        userPerfilImage: true,
      },
      where: { id: ids[i].userId },
    });
    userList.push(response);
  }
  return userList;
}
