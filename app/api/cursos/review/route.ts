import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    let cursoId = params.get("id");

    if(!cursoId){
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const response = await fetch(`https://www.udemy.com/api-2.0/courses/${cursoId}/reviews`, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Basic UU9JRjlQR0ZJZ2M4cW5NOG04Tmc2VU1ET2s5Z21lUXNpRkpPS2p5WjpXamI0MktHNnplSFpJVWZLMHhNUVR5QXFPY2JNUEFXY3Z1OUhyZnUzRm15MGIzcUdoWVg4RTVqS2cwcHRXbTZya2RsbGIwbUpqUDQ2VGtQNGpMVnpDenBWZ29jM1BTam1SbVdOb2M4akJacTlLdEk1NUtYOXE1ajZ2bVpzUWl0Mg=='
        }
      });
      
      const data = await response.json();
    return  NextResponse.json( data );
}
