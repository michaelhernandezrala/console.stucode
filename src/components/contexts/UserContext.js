import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setId(decodedToken.id);
    }
  }, [token]);

  return <UserContext.Provider value={{ id, setId, token, setToken }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
