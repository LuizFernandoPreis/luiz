import { action } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  let search = params.get("search");

  let id = 0;

  try {
    const response = await fetch(`https://www.udemy.com/api-2.0/courses/?page=1&page_size=10&category=Development&price=price-paid&language=pt&search=${search}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Basic UU9JRjlQR0ZJZ2M4cW5NOG04Tmc2VU1ET2s5Z21lUXNpRkpPS2p5WjpXamI0MktHNnplSFpJVWZLMHhNUVR5QXFPY2JNUEFXY3Z1OUhyZnUzRm15MGIzcUdoWVg4RTVqS2cwcHRXbTZya2RsbGIwbUpqUDQ2VGtQNGpMVnpDenBWZ29jM1BTam1SbVdOb2M4akJacTlLdEk1NUtYOXE1ajZ2bVpzUWl0Mg=='
      }
    });
    
    const data = await response.json();

    const res = NextResponse.json(data.results);
    // res.headers.set('Access-Control-Allow-Origin', 'https://tcc-ifsc.vercel.app,');
    // res.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS'); 
    // res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return res;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const id = body.id;

  if (!id) {
    return NextResponse.json("Missing id parameter", { status: 400 });
  }

  try{
    const curso = await action.cursos().create({id})

    return NextResponse.json(curso);
  }catch(error){}

}