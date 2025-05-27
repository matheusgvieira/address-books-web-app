import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  SearchAddressSchema,
  type FormSearchAddressSchemaValues,
} from "../schemas/search-address.schema";
import { useAddressStore } from "../store/addressStore";

export const EditUser: React.FC = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const user = useAddressStore((state) =>
    state.getUserByUsername(username || "")
  );
  const updateUser = useAddressStore((state) => state.updateUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSearchAddressSchemaValues>({
    resolver: yupResolver(SearchAddressSchema),
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const onSubmit = (data: FormSearchAddressSchemaValues) => {
    if (!user) return;
    updateUser(user.username, {
      ...user,
      ...data,
    });
    navigate("/list");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-red-500">
        Usuário não encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f4] flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8">
        <h2 className="text-xl font-bold mb-6 text-[#111418]">
          Editar usuário
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              placeholder="Username"
              {...register("username")}
              disabled
              className="w-full h-12 px-4 rounded-xl border border-[#dce0e5] bg-gray-100 text-[#637588] cursor-not-allowed"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <input
              placeholder="Display name"
              {...register("displayName")}
              className="w-full h-12 px-4 rounded-xl border border-[#dce0e5] placeholder-[#637588] text-[#111418] focus:ring-1 focus:ring-[#1980e6] outline-none"
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm">
                {errors.displayName.message}
              </p>
            )}
          </div>

          <div>
            <input
              placeholder="Postal code"
              {...register("postalCode")}
              className="w-full h-12 px-4 rounded-xl border border-[#dce0e5] placeholder-[#637588] text-[#111418] focus:ring-1 focus:ring-[#1980e6] outline-none"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm">
                {errors.postalCode.message}
              </p>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/list")}
              className="h-12 px-4 border border-gray-400 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="h-12 px-6 bg-[#1980e6] text-white font-bold rounded-xl hover:bg-[#136fd1] cursor-pointer transition-colors"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
