import { action } from '@/actions'
import { ClienteSchema } from '@/actions/cliente/schema'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log(body)
  const { success } = ClienteSchema.safeParse(body)

  if (!success)
    return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 })

  const { error } = await action.cliente().create(body)

  if (error) return NextResponse.json({ message: error }, { status: 400 })

  return NextResponse.json({ message: 'Cliente cadastrado com sucesso!' })
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  let param = params.get("id");

  if (!param) {
    const data = await action.cliente().findMany({ where: {} });
    return NextResponse.json({ message: data });
  }
  let id = parseInt(param);
  const data = await action.cliente().find({ where: {id} });
  return NextResponse.json({ message: data });
}

// export async function PUT(request: NextRequest) {
//   const body = await request.json()

//   const { success } = EndUpdateSchema.safeParse(body)

//   if (!success)
//     return NextResponse.json({ message: 'Dados inválidos!' }, { status: 400 })

//   const { error } = await action.uf().update(body)

//   if (error) return NextResponse.json({ message: error }, { status: 400 })

//   return NextResponse.json({ message: 'Uf Atualizado com sucesso!' })
// }

// export async function DELETE(request: NextRequest) {
//   const params = request.nextUrl.searchParams;
//   let param = params.get("id");

//   if(!param) return NextResponse.json({ message: 'Parametro id é obrigatorio!' }, { status: 400 });
  
//   try{
//     let id = parseInt(param)
//     const exist = action.endereco().find({where:{id}});
//     if(!exist) return NextResponse.json({ message: 'Endereco não cadastrada!' }, { status: 400 });

//     await action.endereco().delete({where:{id}});
//     return NextResponse.json({ message: 'Endereco deletada com sucesso!' });
//   }catch{
//     return NextResponse.json({ message: 'Erro ao deletar Endereco, tente novamente mais tarde!' }, { status: 400 });
//   }
// }