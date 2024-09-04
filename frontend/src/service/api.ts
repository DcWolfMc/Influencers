import axios from "axios";
import { newUserData } from "@/@types/userData";
import {
  GetAllInfluencersRequest,
  NewInfluencerData,
} from "@/@types/influencerDataType";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});
//////////////////////////////    Influencers Routes   //////////////////////////////
export const getAllInfluencers = async (
  { page = "1", pageSize = "10", brands, categories }: GetAllInfluencersRequest,
  token: string
) => {
  const params = new URLSearchParams();

  if (categories) params.append("categories", categories);
  if (brands) params.append("brands", brands);
  params.append("page", page);
  params.append("pageSize", pageSize);
  console.log("params:", params);

  return await api.get(`/influencers?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getInfluencerById = async (id: string, token: string) => {
  return await api.get(`/influencers/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const addInfluencer = async (
  InfluencerData: NewInfluencerData,
  token: string
) => {
  return api.post(`/influencers`, InfluencerData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const editInfluencer = async (
  id: string,
  InfluencerData: Partial<NewInfluencerData>,
  token: string
) => {
  return api.put(`/influencers/${id}`, InfluencerData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const deleteInfluencerById = async (id: string, token: string) => {
  return await api.delete(`/influencers/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
//////////////////////////////    Auth Routes   //////////////////////////////

export const signIn = async (data: { email: string; password: string }) => {
  return await api.post("/auth", data);
};
export const refreshTokens = async (refreshToken: string) => {
  return await api.post("/auth/refresh", { refreshToken });
};
export const signUp = async (data: newUserData) => {
  return await api.post("/users", data);
};
export const getUser = async (id: number, token: string) => {
  return await api.get(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//////////////////////////////    Categories Routes   //////////////////////////////
export const getAllBrands = async (token: string) => {
  return await api.get(`/brands`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
//////////////////////////////    Brands Routes   //////////////////////////////

//////////////////////////////    CEP Routes   //////////////////////////////
export const getCepInformation = (cep: string) => {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
};
