import { action } from "@/actions";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import FavHandler from "../helper";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    let id = params.get("id");
    let cId = params.get("cursoId");
    

    if (!id) {
        return NextResponse.json("Missing id parameter", { status: 400 });
    }

    if (cId) {
        const vagaId = parseInt(id);
        const cursoId = parseInt(cId);
        const favorito = await db.curso_vaga.findFirst({
            where: {
              AND: [
                { vagaId },
                { cursoId: cursoId },
              ],
            },
          });
          

        return NextResponse.json(favorito);
    }

    const vagaId = parseInt(id);
    const favoritos = await db.curso_vaga.findMany({
        select: {
          cursoId: true,
        },
        where: {
          vagaId
        },
      });

      let data = await FavHandler(favoritos);


    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    let vagaId = body.vagaId;
    let cursoId = body.cursoId;

    if (!vagaId || !cursoId) {
        return NextResponse.json("Missing id or cursoId parameter", { status: 400 });
    }

    const vaga = await db.vaga.findUnique({ where: { id: vagaId } });
    if (!vaga) {
        return NextResponse.json("User not found", { status: 404 });
    }

    const curso = await db.curso.findUnique({ where: { id: cursoId } });
    if (!curso) {
        return NextResponse.json("Course not found", { status: 404 });
    }

    const curso_vaga = await db.curso_vaga.create({
        data: {
            vagaId,
            cursoId,
        },
    });

    return NextResponse.json(curso_vaga);
}

export async function DELETE(request: NextRequest) {
    const body = await request.json();

    let vagaId = body.vagaId;
    let cursoId = body.cursoId;

    if (!vagaId || !cursoId) {
        return NextResponse.json("Missing vagaId or cursoId parameter", { status: 400 });
    }

    const favorito = await db.curso_vaga.delete({
        where: {
            cursoId_vagaId: {
                cursoId,
                vagaId,
        }},
    });

    return NextResponse.json(favorito);
}