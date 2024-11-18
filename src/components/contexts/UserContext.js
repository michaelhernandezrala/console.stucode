import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          setToken(null);
          setId(null);
          localStorage.removeItem("authToken");
        } else {
          setId(decodedToken.id);
        }
      } catch (error) {
        console.error("Token inválido o error al decodificar:", error);
        setToken(null);
        setId(null);
        localStorage.removeItem("authToken");
      }
    }
  }, [token]);

  return <UserContext.Provider value={{ id, setId, token, setToken }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
