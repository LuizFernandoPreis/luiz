import { action } from "@/actions";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const cnpj = params.get("cnpj");

    if(cnpj) {
        try {
            const vagas = await db.vaga.findMany({where:{empresaId: cnpj}})
            return NextResponse.json(vagas);
        } catch (error) {
            return NextResponse.json({ error });
        }
    }

    return NextResponse.json('CNPJ Missing', {status:400})
}
