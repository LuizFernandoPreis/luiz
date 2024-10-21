export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-center font-semibold mt-8 text-2xl">Vincule Cursos a Vaga</h1>
      <div className="flex justify-center">
        <div className="bg-mercury h-6 w-2/3 mt-8 rounded-md">
          Vaga: {params.id}
        </div>
      </div>
    </div>
  );
}
