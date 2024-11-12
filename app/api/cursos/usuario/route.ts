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
        const cursoId = parseInt(cId);
        const favorito = await db.usuario_curso.findFirst({
            where: {
              AND: [
                { userId: id },
                { cursoId: cursoId },
              ],
            },
          });
          

        return NextResponse.json(favorito);
    }

    const curso = await db.usuario_curso.findMany({
        select: {
          cursoId: true,
        },
        where: {
          userId: id,
        },
      });

    return NextResponse.json(curso);
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    let usuarioId = body.usuarioId;
    let cursoId = body.cursoId;

    if (!usuarioId || !cursoId) {
        return NextResponse.json("Missing id or cursoId parameter", { status: 400 });
    }

    const usuario = await db.usuario.findUnique({ where: { id: usuarioId } });
    if (!usuario) {
        return NextResponse.json("User not found", { status: 404 });
    }

    const curso = await db.curso.findUnique({ where: { id: cursoId } });
    if (!curso) {
        return NextResponse.json("Course not found", { status: 404 });
    }

    const favorito = await db.usuario_curso.create({
        data: {
            userId: usuarioId,
            cursoId,
        },
    });

    return NextResponse.json(favorito);
}

export async function DELETE(request: NextRequest) {
    const body = await request.json();

    let usuarioId = body.usuarioId;
    let cursoId = body.cursoId;

    if (!usuarioId || !cursoId) {
        return NextResponse.json("Missing id or cursoId parameter", { status: 400 });
    }

    const favorito = await db.usuario_curso.delete({
        where: {
            userId_cursoId: {
                cursoId,
                userId: usuarioId,
        }},
    });

    return NextResponse.json(favorito);
}