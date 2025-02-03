"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const URLBASE = "https://images-qciu.onrender.com";

interface UserUpdateModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalUpdatePerfilImage({
  userId,
  isOpen,
  onClose,
}: UserUpdateModalProps) {
  const [loading, setLoading] = useState(false);
  const [capaImage, setCapaImage] = useState<File | null>(null);

  const { handleSubmit } = useForm();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCapaImage(e.target.files[0]);
    }
  };

  const onSubmit = async () => {
    if (!capaImage) {
      alert("Por favor, selecione uma imagem de capa.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", capaImage);
    formData.append("id", userId);
    formData.append("dest", "perfil");

    try {
      const uploadResponse = await axios.post(
        `/api/usuario/images/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const body = {
        url: URLBASE + uploadResponse.data.filePath,
        id: userId,
        local: "perfil",
      };

      await axios.put("/api/usuario/images", body);
      alert("Imagem de perfil atualizada com sucesso!");
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      alert("Erro ao atualizar a imagem de perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-[90%] md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-xl p-12 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Atualizar Imagem de Perfil</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="capaImage" className="block text-sm font-medium mb-1">
              Selecione uma imagem de Perfil
            </label>
            <input
              type="file"
              id="capaImage"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleImageChange}
              className="w-full p-2 rounded-md border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
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
