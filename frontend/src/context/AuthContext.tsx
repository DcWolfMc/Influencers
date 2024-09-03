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
  refrashToken: string | null;
  accessToken: string | null;
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
  const [refrashToken, setRefrashToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");
      const storedUserId = localStorage.getItem("userId");
      if (storedAccessToken && storedRefreshToken && storedUserId) {
        try {
          const response = await refreshTokens(storedRefreshToken);
          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;
          const newuserId = response.data.userId;
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          localStorage.setItem("userId", newuserId);

          getUser(newuserId, newAccessToken).then((response) => {
            console.log("getUserData:", response.data);
            setUserData(response.data);
          });

          setAccessToken(newAccessToken);
          setRefrashToken(newuserId);
          setIsAuthenticated(true);
          setUserId(Number(localStorage.getItem("userId")));
        } catch (refreshError) {
          console.log("refreshError", refreshError);

          logout();
        }
      }
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

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userId.toString());

      setAccessToken(accessToken);
      setRefrashToken(refreshToken);
      setIsAuthenticated(true);
      setUserId(userId);
      getUser(userId, accessToken).then((response) => {
        console.log("getUserData:", response.data);
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
    setUserData(null)
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        userId,
        accessToken,
        refrashToken,
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
