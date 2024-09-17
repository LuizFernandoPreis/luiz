import { action } from '@/actions'
import { UfSchema } from '@/actions/uf/schema'
import { Exo } from 'next/font/google'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { success } = UfSchema.safeParse(body)

  if (!success)
    return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 })

  const { error } = await action.uf().create(body)

  if (error) return NextResponse.json({ message: error }, { status: 400 })

  return NextResponse.json({ message: 'Uf criado com sucesso' })
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  let uf = params.get("uf");

  if (!uf) {
    const data = await action.uf().findMany({ where: {} });
    return NextResponse.json({ message: data });
  }

  const data = await action.uf().find({ where: {uf} });
  return NextResponse.json({ message: data });
}

export async function PUT(request: NextRequest) {
  const body = await request.json()

  const { success } = UfSchema.safeParse(body)

  if (!success)
    return NextResponse.json({ message: 'Dados inválidos!' }, { status: 400 })

  const { error } = await action.uf().update(body)

  if (error) return NextResponse.json({ message: error }, { status: 400 })

  return NextResponse.json({ message: 'Uf Atualizado com sucesso!' })
}

export async function DELETE(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  let uf = params.get("uf");

  if(!uf) return NextResponse.json({ message: 'Parametro uf é obrigatorio!' }, { status: 400 });
  
  try{
    const exist = action.uf().find({where:{uf}});
    if(!exist) return NextResponse.json({ message: 'UF não cadastrada!' }, { status: 400 });

    await action.uf().delete({where:{uf}});
    return NextResponse.json({ message: 'UF deletada com sucesso!' });
  }catch{
    return NextResponse.json({ message: 'Erro ao deletar UF, tente novamente mais tarde!' }, { status: 400 });
  }
}