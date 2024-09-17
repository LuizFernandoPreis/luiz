import { action } from "@/actions";
import { CidadeSchema, CidadeUpdateSchema } from "@/actions/cidade/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { success } = CidadeSchema.safeParse(body);
  if (!success)
    return NextResponse.json({ message: "Dados inválidos" }, { status: 400 });

  const { error } = await action.cidade().create(body);

  if (error) return NextResponse.json({ message: error }, { status: 400 });

  return NextResponse.json({ message: "Cidade criada com sucesso" });
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  let cidadeId = params.get("id");

  if (!cidadeId) {
    const data = await action.cidade().findMany({ where: {} });
    return NextResponse.json({ message: data });
  }

  let id = parseInt(cidadeId);
  const data = await action.cidade().find({ where: { id } });
  return NextResponse.json({ message: data });
}

export async function PUT(request: NextRequest) {
  const body = await request.json()

  
  const { success } = CidadeUpdateSchema.safeParse(body)
  if (!success)
    return NextResponse.json({ message: 'Dados inválidos!' }, { status: 400 })
  

  const { error } = await action.cidade().update(body)

  if (error) return NextResponse.json({ message: error }, { status: 400 })

  return NextResponse.json({ message: 'Cidade Atualizada com sucesso!', error })
}

export async function DELETE(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  let param = params.get("id");

  if(!param) return NextResponse.json({ message: 'Parametro id é obrigatorio!' }, { status: 400 });
  
  try{
    let id = parseInt(param)
    const exist = action.cidade().find({where:{id}});
    if(!exist) return NextResponse.json({ message: 'Cidade não cadastrada!' }, { status: 400 });

    await action.cidade().delete({where:{id}});
    return NextResponse.json({ message: 'Cidade deletada com sucesso!' });
  }catch{
    return NextResponse.json({ message: 'Erro ao deletar Cidade, tente novamente mais tarde!' }, { status: 400 });
  }
}