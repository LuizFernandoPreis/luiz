import Curso from "@/app/(platform)/(home)/cursos/types/cursoType";

type FavHandler = { cursoId: number }[];

async function getCurso(id: number) {
  const response = await fetch(
    `https://www.udemy.com/api-2.0/courses/${id}`,
    {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization:
          "Basic UU9JRjlQR0ZJZ2M4cW5NOG04Tmc2VU1ET2s5Z21lUXNpRkpPS2p5WjpXamI0MktHNnplSFpJVWZLMHhNUVR5QXFPY2JNUEFXY3Z1OUhyZnUzRm15MGIzcUdoWVg4RTVqS2cwcHRXbTZya2RsbGIwbUpqUDQ2VGtQNGpMVnpDenBWZ29jM1BTam1SbVdOb2M4akJacTlLdEk1NUtYOXE1ajZ2bVpzUWl0Mg==",
      },
    }
  );

  const data = await response.json();
  return data;
}

export default async function FavHandler(ids: FavHandler) {
  const listaCurso: Curso[] = [];

  for (let i = 0; i < ids.length; i++) {
    const curso = await getCurso(ids[i].cursoId);
    listaCurso.push(curso);
  }

  return listaCurso;
}