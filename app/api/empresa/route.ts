import { action } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const usuarioId = params.get("id");

    if (!usuarioId) {
        return NextResponse.json("Missing id parameter", { status: 400 });
    }
    try {
        const empresa = await action.empresa().find({ where: { usuarioId } });

        return NextResponse.json(empresa);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    try {
        const empresa = await action.empresa().create(body);

        return NextResponse.json(empresa);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create data' });
    }
    
}