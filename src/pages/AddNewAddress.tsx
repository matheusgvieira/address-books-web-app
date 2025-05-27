import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SearchAddressSchema } from "../schemas/search-address.schema";
import { ViaCepService } from "../services/viacep.service";
import { useAddressStore } from "../store/addressStore";
import { maskCep } from "../utils/document.util";

const AddNewAddress: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SearchAddressSchema),
  });

  const postalCode = watch("postalCode");
  const username = watch("username");
  const displayName = watch("displayName");
  const { addUser } = useAddressStore();

  const { data, error, isFetching, refetch, isSuccess } = useQuery({
    queryKey: ["address", postalCode],
    queryFn: ({ queryKey }) => {
      const [, postalCode] = queryKey as [string, string];
      return ViaCepService.fetchAddress(postalCode);
    },
    enabled: !!postalCode,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && data && postalCode) {
      addUser({
        username,
        displayName,
        postalCode,
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
      });
      navigate("/list");
    }
  }, [isSuccess, data, postalCode, addUser, navigate, username, displayName]);

  const onSubmit = async () => {
    await refetch();
  };

  return (
    <div className="min-h-screen bg-[#f0f2f4] flex justify-center items-center px-4 py-10">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-sm overflow-hidden"
        style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}
      >
        <header className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
          <div className="flex items-center gap-3 text-[#111418]">
            <div className="w-5 h-5">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold">Address Books Web App</h2>
          </div>
        </header>

        <div className="px-10 py-8">
          <nav className="flex gap-2 text-sm text-[#637588] mb-4 justify-between align-items-center ">
            <span className="text-[#111418] font-medium">
              Contact Information
            </span>

            <button
              type="button"
              onClick={() => navigate("/list")}
              className="h-12 secondary px-4 rounded-xl flex items-center gap-2 text-[#111418] hover:bg-[#f0f2f4] cursor-pointer transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Lista
            </button>
          </nav>

          <h2 className="text-2xl font-bold text-[#111418] mb-6">
            Add new address
          </h2>

          <form
            className="space-y-4 max-w-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                placeholder="Username"
                {...register("username")}
                className="w-full h-12 px-4 rounded-xl border border-[#dce0e5] placeholder-[#637588] text-[#111418] focus:ring-1 focus:ring-[#1980e6] outline-none"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
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
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  e.target.value = maskCep(value);
                }}
                className="w-full h-12 px-4 rounded-xl border border-[#dce0e5] placeholder-[#637588] text-[#111418] focus:ring-1 focus:ring-[#1980e6] outline-none"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isFetching}
              className="primary w-full h-12 mt-4 bg-[#1980e6] text-white font-bold rounded-xl hover:bg-[#136fd1] transition-colors disabled:opacity-50"
            >
              {isFetching ? "Searching..." : "Search"}
            </button>

            {error && (
              <p className="text-red-600 text-sm mt-2">
                Erro: {String(error.message)}
              </p>
            )}
            {data && (
              <div className="text-sm text-[#111418] bg-gray-100 p-3 rounded mt-4">
                <p>
                  <strong>Logradouro:</strong> {data.logradouro}
                </p>
                <p>
                  <strong>Bairro:</strong> {data.bairro}
                </p>
                <p>
                  <strong>Cidade:</strong> {data.localidade}
                </p>
                <p>
                  <strong>Estado:</strong> {data.uf}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewAddress;
