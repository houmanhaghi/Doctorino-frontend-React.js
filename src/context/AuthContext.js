import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authData, setAuthTokens] = useState(() =>
    localStorage.getItem("authData")
      ? JSON.parse(localStorage.getItem("authData"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authData")
      ? jwt_decode(localStorage.getItem("authData"))
      : null
  );
  let [loading, setLoading] = useState(true);

  const history = useHistory();

  function extractUserData(data) {
    let role = "patient";
    if (data.is_doctor) {
      role = "doctor";
    } else if (data.is_hotel_owner) {
      role = "hotel_owner";
    }
    
    return {
      id: data.id,
      child_id: data['child-id'],
      username: data.username,
      first_name: data['first-name'],
      last_name: data['last-name'],
      role: role,
      email: data["email"],
    };
  }

  let loginUser = async (email, pwd, destination=null) => {
    let response = await fetch("http://188.121.113.74/api/auth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: pwd }),
    });

    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      history.push('/')
      setUser(extractUserData(data));

      localStorage.setItem("authData", JSON.stringify(data));

      if (destination) {
        history.push(destination);
      }

      toast.success(`با موفقیت وارد شدید`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else if (response.status === 400) {
      toast.error("نام کاربری یا رمز عبور اشتباه است", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.error("کابری با این اطلاعات پیدا نشد ", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authData");

    toast.info("خارج شدید", {
      position: "top-right",
      autoClose: 2000,
    });

    history.push("/");
  };

  let contextData = {
    user: user,
    authData: authData,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logOut: logoutUser,
    extractUserData: extractUserData,
  };

  useEffect(() => {
    if (authData) {
      setUser(extractUserData(authData));
    }

    setLoading(false);
  }, [authData, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};