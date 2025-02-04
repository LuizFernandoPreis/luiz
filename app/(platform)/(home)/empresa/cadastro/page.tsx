"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utlis";
import { EmpresaSchema } from "@/actions/empresa/schema";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type EmpresaFormData = z.infer<typeof EmpresaSchema>;

export default function EmpresaForm() {
  const router = useRouter();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset 
  } = useForm<EmpresaFormData>({
    resolver: zodResolver(EmpresaSchema),
  });

  const session = useSession();

  const onSubmit = async (data: EmpresaFormData) => {
    try {
      data = { ...data, cnpj: data.cnpj.replace(/\D/g, "") };

      if (!session.data?.user?.id) {
        alert("Usuário não encontrado na sessão.");
        return;
      }
      const requestData = { ...data, usuarioId: session.data.user.id }; 

      const empresaResponse = await fetch("/api/empresa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!empresaResponse.ok) {
        throw new Error("Erro ao cadastrar empresa.");
      }

      const papelResponse = await fetch("/api/usuario/papel", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: session.data.user.id ,papel: "J" }),
      });

      if (!papelResponse.ok) {
        throw new Error("Erro ao atualizar papel do usuário.");
      }
      
      window.location.href = '/perfil';
      reset();
      router.push("/perfil");
    } catch (error) {
      console.error("Erro no envio:", error);
    }
  };

  return (
    <div className="w-full p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:max-w-md mx-auto p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center">
          Cadastro de Empresa
        </h2>
        <div className="flex flex-col space-y-1">
          <label htmlFor="nome" className="font-medium">
            Nome
          </label>
          <input
            {...register("nome")}
            id="nome"
            type="text"
            className={cn(
              "p-3 rounded-md border bg-gray-50 focus:outline-none focus:ring-2",
              errors.nome ? "border-red-500 ring-red-300" : "border-gray-300"
            )}
          />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="cnpj" className="font-medium">
            CNPJ
          </label>
          <input
            {...register("cnpj")}
            id="cnpj"
            type="text"
            className={cn(
              "p-3 rounded-md border bg-gray-50 focus:outline-none focus:ring-2",
              errors.cnpj ? "border-red-500 ring-red-300" : "border-gray-300"
            )}
          />
          {errors.cnpj && <p className="text-red-500 text-sm">{errors.cnpj.message}</p>}
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="descricao" className="font-medium">
            Descrição
          </label>
          <textarea
            {...register("descricao")}
            id="descricao"
            rows={4}
            className={cn(
              "p-3 rounded-md border bg-gray-50 focus:outline-none focus:ring-2",
              errors.descricao ? "border-red-500 ring-red-300" : "border-gray-300"
            )}
          />
          {errors.descricao && <p className="text-red-500 text-sm">{errors.descricao.message}</p>}
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition"
          >
            Limpar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "px-4 py-2 rounded-md font-medium transition",
              isSubmitting ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
            )}
          >
            {isSubmitting ? "Enviando..." : "Cadastrar"}
          </button>
        </div>
        <input id="id" {...register('usuarioId')} type="text" hidden value={session.data?.user?.id}/>
      </form>
    </div>
  );
}
