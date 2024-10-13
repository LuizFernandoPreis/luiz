import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

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
      console.log(data);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg h-[90%] w-[90%] md:w-2/3 md:h-2/3 overflow-auto">
        <div className="flex justify-between">
          <h2 className="text-2xl mb-4">Atualizar Informações do Usuário</h2>
          <span className="flex align-middle justify-center h-fit w-fit hover:bg-mercury p-2 rounded-lg cursor-pointer" onClick={()=>{signOut()}}>
            <LogOut />
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="nome" className="block">
              Nome
            </label>
            <input
              id="nome"
              {...register("nome", { required: "Nome é obrigatório" })}
              className="border p-2 w-full"
            />
            {errors.nome && (
              <p className="text-red-500">{errors.nome.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              id="email"
              {...register("email", { required: "Email é obrigatório" })}
              className="border p-2 w-full"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="papel" className="block">
              Papel
            </label>
            <input
              id="papel"
              {...register("papel")}
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cidade" className="block">
              Cidade
            </label>
            <input
              id="cidade"
              {...register("cidade")}
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="curso" className="block">
              Curso
            </label>
            <input
              id="curso"
              {...register("curso")}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sit" className="block">
              Situação
            </label>
            <select
              id="sit"
              {...register("sit")}
              className="border p-2 w-full"
              defaultValue={user.sit || "S"}
            >
              <option value="S">Aberto a oportunidades</option>
              <option value="N">Não aberto a oportunidades</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="sobre" className="block">
              Sobre
            </label>
            <textarea
              id="sobre"
              {...register("sobre")}
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="userPerfilImage" className="block">
              Imagem de Perfil
            </label>
            <input
              id="userPerfilImage"
              {...register("userPerfilImage")}
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="userCapaImage" className="block">
              Imagem de Capa
            </label>
            <input
              id="userCapaImage"
              {...register("userCapaImage")}
              className="border p-2 w-full"
            />
          </div>

          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Atualizando..." : "Atualizar"}
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="ml-2 bg-gray-500 text-white p-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
