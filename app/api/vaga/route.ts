import { action } from "@/actions";
import { VagaSchema } from "@/actions/vaga/schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
    const id = param.get("id");


    const data = await action.vaga().findAll(page,limit);

    return NextResponse.json({  data });
}