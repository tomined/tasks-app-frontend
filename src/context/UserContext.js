import React, { createContext, useEffect, useState } from "react";
import httpClient from "../utils/httpClient";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data:{data} } = await httpClient.get("/dashboard");
      setUser(data.email);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
