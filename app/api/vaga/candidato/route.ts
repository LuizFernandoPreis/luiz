import { action } from "@/actions";
import { db } from "@/lib/db";
import { count } from "console";
import { NextRequest, NextResponse } from "next/server";
import { getUsersByIdList } from "../helper";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    let id = params.get("id");
    let vId = params.get("vagaId");

    // Retorna todos os candidatos para uma vaga
    if (!id && vId) {
        const vagaId = parseInt(vId);
        const candidato = await db.usuario_vaga.findMany({where:{vagaId: vagaId}});
        const qtdCandidato = await db.usuario_vaga.count({where:{vagaId: vagaId}});
    
        let candidatos = await getUsersByIdList(candidato);
          
        const data = {candidatos, qtdCandidato};
        return NextResponse.json(data);
    }

    // Retorna se está candidatado a uma vaga especifica
    if (vId && id) {
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

    // retorna em caso de não parametros
    return NextResponse.json("Missing id or vagaId parameter", { status: 400 });
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