import Image from "next/image";

export default function ProfileInfo(){
    return(
        <div className="flex flex-col md:flex-row w-full gap-16 p-4 md:p-0 align-center justify-center">
        <div className="bg-mercury w-full h-60 md:h-60 md:w-1/4 p-2 rounded">
          <div className="relative h-full w-full">
            <Image
              src="https://t3.ftcdn.net/jpg/01/22/53/88/360_F_122538873_4PtXWBeuaQdj2URrc4JcmyurDCMy1ANw.jpg"
              alt="Hero Image"
              fill
              className="object-cover rounded"
            />
          </div>
        </div>
        <div className="bg-mercury rounded md:w-1/2 h-[50%] md:h-60 p-2 flex flex-col md:flex-row gap-2">
          <div className="bg-white shadow-md p-4 rounded md:w-1/3 h-full flex flex-col space-y-4 overflow-hidden">
            <h1 className="text-2xl text-start font-semibold">John Doe</h1>
            <p className="text-md text-start">Cidade: Tubarão</p>
            <p className="text-md text-start">Curso: Engenharia de Software</p>
            <p className="text-md text-start">
              Situação: Em busca de oportunidades
            </p>
          </div>
          <div className="bg-white shadow-md p-4 rounded md:w-2/3 h-full flex flex-col space-y-4 overflow-hidden">
            <h1 className="text-2xl text-start font-semibold">Sobre mim</h1>
            <p className="text-md text-start overflow-auto">
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry s standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    )
}