import { createContext, useContext, useState, useEffect } from "react";
import http from "../components/common/utils/api/http";
type User = { id: string; name: string; email: string,role: "admin" | "user" };
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>({name:'kamlesh',email:"kamlesh@gamil.com",role:"user",id:"213r"});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      http.get('/me').then(res => setUser(res?.user)).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
     http.post('/login',{ email, password }).then((res)=>{
      localStorage.setItem("token", res?.token); 
      setUser(res?.user);
    })
  };

  const register = async (name: string, email: string, password: string) => {
     http.post('/register',{ name, email, password }).then((res)=>{
      if (res?.success) {
      localStorage.setItem("auth-token", res?.token);
      setUser(res?.user);
     }
  })
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
