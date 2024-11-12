import { action } from "@/actions";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    let updatedUser;
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json(
        { error: "ID de usuário não fornecido" },
        { status: 400 }
      );
    }

    if (!body.url) {
      return NextResponse.json(
        { error: "URL de imagem do usuário não fornecido" },
        { status: 400 }
      );
    }

    if (body.local !== "capa") {
      updatedUser = await db.usuario.update({
        where: { id: String(body.id) },
        data: {
          userPerfilImage: body.url,
        },
      });
    } else {
      updatedUser = await db.usuario.update({
        where: { id: String(body.id) },
        data: {
          userCapaImage: body.url,
        },
      });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
