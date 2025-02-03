import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import FormData from "form-data";
import fetch from "node-fetch";

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
      // Atualiza a imagem de perfil
      updatedUser = await db.usuario.update({
        where: { id: String(body.id) },
        data: {
          userPerfilImage: body.url,
        },
      });

      // Atualiza a imagem de perfil das vagas da empresa
      const empresa = await db.empresa.findFirst({where: {usuarioId: body.id}});

      if(empresa) await db.vaga.updateMany({where: {empresaId: empresa.cnpj}, data: {empImage: body.url}});
    } else {
      // Atualiza a imagem de capa
      updatedUser = await db.usuario.update({
        where: { id: String(body.id) },
        data: {
          userCapaImage: body.url,
        },
      });

      // Atualiza a imagem de capa das vagas da empresa
      const empresa = await db.empresa.findFirst({where: {usuarioId: body.id}});

      if(empresa) await db.vaga.updateMany({where: {empresaId: empresa.cnpj}, data: {empCapaImage: body.url}});
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

export async function POST(request: NextRequest) {
  try {
    // Parseia a requisição como FormData
    const incomingFormData = await request.formData();

    const userId = incomingFormData.get("id");
    const dest = incomingFormData.get("dest");

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "ID de usuário não fornecido ou inválido." },
        { status: 400 }
      );
    }

    if (!dest || typeof dest !== "string") {
      return NextResponse.json(
        { error: "Destino da imagem não fornecido ou inválido." },
        { status: 400 }
      );
    }

    // Extrai o arquivo de imagem
    const file = incomingFormData.get("image");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "Imagem não fornecida ou inválida." },
        { status: 400 }
      );
    }

    // Converte o Blob para Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Configura o FormData para enviar para a API Express
    const backendFormData = new FormData();
    backendFormData.append("image", buffer, {
      filename: file.name || "uploaded-image.jpg",
      contentType: file.type || "image/jpeg",
    });

    // Envia a imagem para a API Express com os parâmetros 'id' e 'dest'
    const response = await fetch(`https://images-qciu.onrender.com/upload/${userId}/${dest}`, {
      method: "POST",
      body: backendFormData,
      headers: backendFormData.getHeaders(), // Necessário para 'form-data'
    });

    // Verifica se a resposta da API Express foi bem-sucedida
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Falha ao enviar a imagem para o servidor: ${errorText}`);
    }

    // Parseia a resposta JSON da API Express
    const result = await response.json();

    // Retorna a resposta para o cliente
    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao enviar a imagem para a outra API:", error);
    return NextResponse.json(
      { error: "Erro ao enviar a imagem para a outra API" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const param = request.nextUrl.searchParams
  const id = param.get("id")

  if(!id) return NextResponse.json({ message: "É necessário passar o id!" });

  try{
    const user = await db.usuario.findFirst({where: {id}});

    if(!user) return NextResponse.json({ message: "Usuário não encontrado" });

    return NextResponse.json({perfil: user.userPerfilImage, capa: user.userCapaImage});
  }catch(err){
    return NextResponse.json({error: err})
  }
}