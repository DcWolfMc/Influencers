import axios from "axios";
import { NewInfluencerData } from "@/@types/InfluencerData";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getAllInfluencers = async (
  categories?: string,
  brands?: string,
  page: string = "1",
  pageSize: string = "10"
) => {
  const params = new URLSearchParams();

  if (categories) params.append("categories", categories);
  if (brands) params.append("brands", brands);
  params.append("page", page);
  params.append("pageSize", pageSize);
  console.log("params:", params);

  return await api.get(`/influencers?${params.toString()}`);
};

export const getInfluencerById = async (id: string) => {
  return await api.get(`/influencers/${id}`);
};
export const addInfluencer = async (InfluencerData: NewInfluencerData) => {
  return api.post(`/influencers`, InfluencerData);
};
export const editInfluencer = async (
  id: string,
  InfluencerData: Partial<NewInfluencerData>
) => {
  return api.put(`/influencers/${id}`, InfluencerData);
};
export const DeleteInfluencerById = async (id: string) => {
  return await api.delete(`/influencers/${id}`);
};
