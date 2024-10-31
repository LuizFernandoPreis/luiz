import { action } from "@/actions";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    let id = params.get("id");
    let vId = params.get("vagaId");
    

    if (!id) {
        return NextResponse.json("Missing id parameter", { status: 400 });
    }

    if (vId) {
        const vagaId = parseInt(vId);
        const vaga = await db.usuario_vaga.findFirst({
            where: {
              AND: [
                { userId: id },
                { vagaId: vagaId },
              ],
            },
          });
          

        return NextResponse.json(vaga);
    }
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    let usuarioId = body.usuarioId;
    let vagaId = body.vagaId;

    if (!usuarioId || !vagaId) {
        return NextResponse.json("Missing id or vagaId parameter", { status: 400 });
    }

    const favorito = await db.usuario_vaga.create({
        data: {
            userId: usuarioId,
            vagaId,
        },
    });

    return NextResponse.json(favorito);
}

export async function DELETE(request: NextRequest) {
    const body = await request.json();

    let usuarioId = body.usuarioId;
    let vagaId = body.vagaId;

    if (!usuarioId || !vagaId) {
        return NextResponse.json("Missing id or vagaId parameter", { status: 400 });
    }

    const favorito = await db.usuario_vaga.delete({
        where: {
            userId_vagaId: {
                vagaId,
                userId: usuarioId,
        }},
    });

    return NextResponse.json(favorito);
}