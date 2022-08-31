import { createContext, useContext, useEffect, useState } from "react";
import App from "../App";

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    //token ile kullanici bilgilerini aldigimiz api fonksiyonu, bilgiler daha sonra uygulamaya gonderip kullaniyoruz
    const isAuth = async (token) => {
      try {
        fetch("https://api.realworld.io/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${token}`,
          },
        }).then((data) =>
          data.json().then((data) => {
            if ("user" in data) {
              setAuth(true);
              setUser(data.user);
            }
          })
        );
      } catch (error) {
        setUser(null);
        setAuth(false);
        console.log(error);
      }
    };
    if (token) {
      isAuth(token);
    } else {
      setAuth(false);
    }
  }, [auth, token]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user }}>
      <App data={user} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
