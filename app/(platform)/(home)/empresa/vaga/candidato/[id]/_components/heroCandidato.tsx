import Image from "next/image";

type User = {
  id: string;
  cidade: string;
  nome: string;
  email: string;
  curso: string;
  userPerfilImage: string;
  userCapaImage: string;
  sobre: string;
};

type HeroSectionProps = {
  candidato: User;
  perfilImage?: string;
  capaImage?: string;
};

export default function HeroSection({
  candidato,
  perfilImage,
  capaImage,
}: HeroSectionProps) {
  const capaSrc = capaImage
    ? `${capaImage}?cache-buster=${Date.now()}`
    : "/icons/ifsc.jpg";
  const perfilSrc = perfilImage
    ? `${perfilImage}?cache-buster=${Date.now()}`
    : "/icons/ifsc.jpg";

  const subject = "Contato da Empresa";
  const body = "Olá, gostaríamos de entrar em contato com você.";

  const handleContactClick = () => {
    window.location.href = `mailto:${candidato.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 sm:py-32 min-h-[500px] md:max-h-[500px] flex items-center justify-center">
      {/* Background Image */}
      <Image
        src={capaSrc}
        alt="Imagem de Capa"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="absolute inset-0 -z-20 opacity-50"
        priority
      />

      {/* Content */}
      <div className="flex flex-col w-full h-full p-4">
        {candidato && (
          <div className="flex justify-center mt-20 md:mt-8">
            <div className="bg-black bg-opacity-50 md:w-[60%] rounded-md p-4 text-center">
              <h1 className="text-4xl font-bold text-white">{candidato.nome}</h1>
              <p className="text-xl mt-4 text-white">{candidato.curso}</p>
              <p className="text-xl mt-4 text-white">{candidato.email}</p>
            </div>
          </div>
        )}

        {/* Profile and Contact Section */}
        <div className="flex flex-col md:flex-row justify-center items-center mt-8 mb-20 md:mb-4 gap-8 md:gap-32">
          {/* Profile Image */}
          <div className="relative w-[300px] h-[300px] rounded-md overflow-hidden">
            <Image
              src={perfilSrc}
              alt="Imagem de Perfil"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-md"
            />
          </div>

          {/* Contact Button */}
          <div className="flex justify-center items-center">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-xl font-medium rounded-lg py-3 px-8 transition duration-300 text-gray-800"
              onClick={handleContactClick}
            >
              Encaminhar E-mail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
