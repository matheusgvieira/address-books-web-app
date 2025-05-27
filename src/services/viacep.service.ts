import axios from "axios";
import type { ViaCepSearchResponse } from "./viacep.types";

export const viaCepApi = axios.create({
  baseURL: "https://viacep.com.br/ws",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export class ViaCepService {
  static async fetchAddress(postalCode: string): Promise<ViaCepSearchResponse> {
    const { data } = await viaCepApi.get<ViaCepSearchResponse>(
      `/${postalCode}/json/`
    );

    return data;
  }
}
