import { action } from "@/actions";
import { VagaSchema } from "@/actions/vaga/schema";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { success, error: ZodError } = await VagaSchema.safeParse(body);

  if (!success) {
    return NextResponse.json({ message: ZodError?.errors[0].message });
  }

  const vaga = await action.vaga().create(body);

  return NextResponse.json({ message: "Vaga cadastrada com sucesso!", vaga });
}

export async function GET(request: NextRequest) {
  const param = request.nextUrl.searchParams;
  const page = parseInt(param.get("page") ?? "1");
  const limit = parseInt(param.get("limit") ?? "5");
  const search = param.get("search") || undefined;
  const modalidade = param.get("modalidade") || undefined;
  const senioridade = param.get("senioridade") || undefined;
  const contatacao = param.get("contratacao") || undefined;
  const id = param.get("id");

  // Filtro por ID
  if (id) {
    const searchId = parseInt(id);
    const vaga = await action.vaga().find({ where: { id: searchId } });
    return NextResponse.json({ vaga });
  }

  // Filtros gerais
  const whereConditions: Prisma.VagaWhereInput = {
    AND: [
      search
        ? { titulo: { contains: search, mode: "insensitive" } }
        : undefined,
      modalidade ? { modalidade } : undefined,
      senioridade ? { senioridade } : undefined,
      contatacao ? { contatacao } : undefined,
    ].filter(Boolean) as Prisma.VagaWhereInput[], 
  };

  // Consulta com filtros e paginação
  const data = await db.vaga.findMany({
    where: whereConditions,
    skip: (page - 1) * limit,
    take: limit,
  });

  // Total de registros para paginação
  const total = await db.vaga.count({ where: whereConditions });

  return NextResponse.json({ data, total, page, limit });
}
