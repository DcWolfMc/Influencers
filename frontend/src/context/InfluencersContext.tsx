import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  GetAllInfluencersData,
  InfluencerData,
  GetAllInfluencersRequest,
} from "@/@types/influencerDataType";
import { getAllInfluencers, getInfluencerById } from "@/service/api";
import { AxiosError } from "axios";
import { NestErrorType } from "@/@types/errortypes";
import { useAuth } from "./AuthContext";

interface InfluencerContextProps {
  influencers: InfluencerData[];
  influencersData: GetAllInfluencersData;
  selectedInfluencer: InfluencerData | null;
  fetchInfluencers: (
    params: GetAllInfluencersRequest,
    token: string
  ) => Promise<void>;
  fetchInfluencerById: (id: string) => Promise<void>;
  setSelectedInfluencer: (influencer: InfluencerData | null) => void;
}

const InfluencerContext = createContext<InfluencerContextProps | undefined>(
  undefined
);

interface InfluencerProviderProps {
  children: ReactNode;
}

export const InfluencerProvider: React.FC<InfluencerProviderProps> = ({
  children,
}) => {
  const { logout } = useAuth();
  const [influencers, setInfluencers] = useState<InfluencerData[]>([]);
  const [selectedInfluencer, setSelectedInfluencer] =
    useState<InfluencerData | null>(null);
  const [influencersData, setInfluencersData] = useState<GetAllInfluencersData>(
    { influencers: [], pageSize: 10, totalCount: 0, totalPages: 1 }
  );
  const fetchInfluencers = async (
    params: GetAllInfluencersRequest,
    token: string
  ) => {
    try {
      const response = await getAllInfluencers(params, token);
      setInfluencersData(response.data);
      setInfluencers(response.data.influencers);
    } catch (error) {
      console.error("Failed to fetch influencers:", error);
      const fetchError = error as AxiosError<NestErrorType>;
      if (fetchError.response?.data.error == "Unauthorized") {
        logout();
      }
    }
  };

  const fetchInfluencerById = async (id: string) => {
    try {
      const response = await getInfluencerById(id);
      setSelectedInfluencer(response.data);
    } catch (error) {
      console.error("Failed to fetch influencers:", error);
      const fetchError = error as AxiosError<NestErrorType>;
      if (fetchError.response?.data.message == "jwt expired") {
        logout();
      }
    }
  };

  return (
    <InfluencerContext.Provider
      value={{
        influencers,
        influencersData,
        selectedInfluencer,
        fetchInfluencers,
        fetchInfluencerById,
        setSelectedInfluencer,
      }}
    >
      {children}
    </InfluencerContext.Provider>
  );
};

export const useInfluencer = () => {
  const context = useContext(InfluencerContext);
  if (!context) {
    throw new Error("useInfluencer must be used within an InfluencerProvider");
  }
  return context;
};
