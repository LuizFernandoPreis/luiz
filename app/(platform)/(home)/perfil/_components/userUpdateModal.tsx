'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utlis"; // Função para combinar classes CSS

interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
  papel: string | null;
  cidade: string | null;
  curso: string | null;
  sit: string | null;
  sobre: string | null;
  userPerfilImage: string | null;
  userCapaImage: string | null;
  criadoEm: Date;
  atualizadoEm: Date | null;
  ultimoAcesso: Date | null;
}

interface UserUpdateModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserUpdateModal({
  user,
  isOpen,
  onClose,
}: UserUpdateModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({
    defaultValues: user,
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: User) => {
    setLoading(true);
    try {
      await axios.put(`/api/usuario/?id=${user.id}`, data);
      alert("Usuário atualizado com sucesso!");
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center z-100 justify-center bg-black bg-opacity-50">
      <div className="w-[90%] md:w-2/3 lg:w-1/2 bg-white rounded-lg z-50  shadow-lg p-12 mt-32 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Atualizar Usuário</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium mb-1">
              Nome
            </label>
            <input
              id="nome"
              {...register("nome", { required: "Nome é obrigatório" })}
              className={cn(
                "w-full p-2 rounded-md border bg-gray-50 focus:outline-none focus:ring-2",
                errors.nome ? "border-red-500 ring-red-300" : "border-gray-300"
              )}
            />
            {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              {...register("email", { required: "Email é obrigatório" })}
              className={cn(
                "w-full p-2 rounded-md border bg-gray-50 focus:outline-none focus:ring-2",
                errors.email ? "border-red-500 ring-red-300" : "border-gray-300"
              )}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div hidden>
            <label htmlFor="papel" className="block text-sm font-medium mb-1">
              Papel
            </label>
            <input
              id="papel"
              {...register("papel")}
              className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="cidade" className="block text-sm font-medium mb-1">
              Cidade
            </label>
            <input
              id="cidade"
              {...register("cidade")}
              className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="curso" className="block text-sm font-medium mb-1">
              Curso
            </label>
            <input
              id="curso"
              {...register("curso")}
              className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="sit" className="block text-sm font-medium mb-1">
              Situação
            </label>
            <select
              id="sit"
              {...register("sit")}
              className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="S">Aberto a oportunidades</option>
              <option value="N">Não aberto a oportunidades</option>
            </select>
          </div>

          {/** Sobre */}
          <div>
            <label htmlFor="sobre" className="block text-sm font-medium mb-1">
              Sobre
            </label>
            <textarea
              id="sobre"
              {...register("sobre")}
              className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <input
              id="userPerfilImage"
              {...register("userPerfilImage")}
              className="w-full hidden p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <input
              id="userCapaImage"
              {...register("userCapaImage")}
              className="w-full hidden p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Atualizando..." : "Atualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
