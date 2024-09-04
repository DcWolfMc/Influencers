import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getAllBrands } from "@/service/api"; // Substitua o caminho conforme necessário
import { BrandData } from "@/@types/brandData"; // Substitua o caminho conforme necessário
import { useAuth } from "./AuthContext";
import { AxiosError } from "axios";
import { NestErrorType } from "@/@types/errortypes";

interface BrandsContextProps {
  brands: BrandData[] | null;
  fetchBrands: (token: string) => Promise<void>;
  // Outras funções de manipulação de marcas podem ser adicionadas aqui
}

const BrandsContext = createContext<BrandsContextProps | undefined>(undefined);

export const BrandProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken, logout, loading } = useAuth();
  const [brands, setBrands] = useState<BrandData[] | null>(null);

  useEffect(() => {
    if (!loading) {
      fetchBrands(accessToken!);
      console.log("accessToken", accessToken);
    }
  }, [loading]);

  const fetchBrands = async (token: string) => {
    try {
      const response = await getAllBrands(token);
      setBrands(response.data); // Supondo que os dados da API retornem as marcas diretamente
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
      const fetchError = error as AxiosError<NestErrorType>;
      if (fetchError.response?.data.error == "Unauthorized") {
        logout();
      }
    }
  };

  return (
    <BrandsContext.Provider value={{ brands, fetchBrands }}>
      {children}
    </BrandsContext.Provider>
  );
};

export const useBrands = () => {
  const context = useContext(BrandsContext);
  if (!context) {
    throw new Error("useBrands deve ser usado dentro de um BrandsProvider");
  }
  return context;
};
