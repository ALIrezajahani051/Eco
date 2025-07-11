import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children, setLoading }) => {
  const [token, setToken] = useState(""); // localStorage.getItem("token") ||
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const loginAction = async (username, password, setError) => {
    try {
      const response = await fetch(
        "https://emeettest.pythonanywhere.com/login/major",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const res = await response.json();
      if (response.ok) {
        setLoading(true);
        setToken(res.token);
        return;
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    if (token != "") {
      setLoading(false);
      localStorage.setItem("token", token);
      navigate("/major/panel");
    }
  }, [token]);

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ setLoading, token, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
