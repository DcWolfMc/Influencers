import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { signIn, refreshTokens, getUser } from "@/service/api";
import { useNavigate } from "react-router-dom";
import { UserData } from "@/@types/userData";

interface AuthContextProps {
  isAuthenticated: boolean;
  userData: UserData | null;
  userId: number | null;
  refreshToken: string | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      
      const storedAccessToken = await localStorage.getItem("accessToken");
      const storedRefreshToken = await localStorage.getItem("refreshToken");
      const storedUserId = await localStorage.getItem("userId");
      
      if (storedAccessToken && storedRefreshToken && storedUserId) {
        try {
          const response = await refreshTokens(storedRefreshToken);
          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken.token;
          const newUserId = response.data.userId;

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          localStorage.setItem("userId", newUserId);

          getUser(newUserId, newAccessToken).then((response) => {
            setUserData(response.data);
          });

          setAccessToken(newAccessToken);
          setRefreshToken(newRefreshToken);
          setIsAuthenticated(true);
          setUserId(Number(newUserId));
          navigate("/influencers");
        } catch (refreshError) {
          console.log("refreshError", refreshError);
          logout();
        }
      } else {
        setIsAuthenticated(false);
        setUserData(null);
        setUserId(null);
        setAccessToken(null);
        setRefreshToken(null);
      }
      
      setLoading(false); // Finaliza o carregamento
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await signIn({
        email,
        password,
      });

      const { accessToken, refreshToken, userId } = response.data;

      await localStorage.setItem("accessToken", accessToken);
      await localStorage.setItem("refreshToken", refreshToken.token);
      await localStorage.setItem("userId", userId.toString());

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setIsAuthenticated(true);
      setUserId(userId);
      getUser(userId, accessToken).then((response) => {
        setUserData(response.data);
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    setAccessToken(null);
    setIsAuthenticated(false);
    setUserId(null);
    setUserData(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        userId,
        accessToken,
        refreshToken,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
