"use client";

export default function TagSearch() {
  const handleClick: React.MouseEventHandler<HTMLParagraphElement> = (
    event
  ) => {
    alert(event.currentTarget.id);
  };

  const contratoTag = ["PJ", "CLT"];
  const modalidateTag = ["Presencial", "Hibrido", "Remoto"];
  const SenioridadeTag = ["Trainee", "Estágio", "Junior", 'Pleno', "Senior"]

  return (
    <div className="w-1/4 hidden md:block">
      <h2 className="text-2xl font-bold mb-4">Tags de Busca</h2>
      <div className="bg-white shadow-md p-4 rounded">
        <h3 className="font-semibold">Tipo de Contrato</h3>
        <div className="flex flex-row space-x-4">
          {contratoTag.map((tag, i) => (
            <div className="bg-mercury shadow-md rounded w-max px-1 mt-2 flex align-center justify-center hover:bg-alternate">
              <p className="text-gray-700" key={i} id={String(i)} onClick={handleClick}>
                {tag}
              </p>
            </div>
          ))}
        </div>
        <h3 className="font-semibold mt-8">Modalidade</h3>
        <div className="flex flex-wrap space-x-4">
          {modalidateTag.map((tag, i) => (
            <div className="bg-mercury shadow-md rounded w-max px-1 mt-2 flex align-center justify-center hover:bg-alternate">
              <p className="text-gray-700" key={i} id={String(i)} onClick={handleClick}>
                {tag}
              </p>
            </div>
          ))}
        </div>
        <h3 className="font-semibold mt-8">Senioridade</h3>
        <div className="flex flex-wrap space-x-4">
          {SenioridadeTag.map((tag, i) => (
            <div className="bg-mercury shadow-md rounded w-max px-1 mt-2 flex align-center justify-center hover:bg-alternate">
              <p className="text-gray-700" key={i} id={String(i)} onClick={handleClick}>
                {tag}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
