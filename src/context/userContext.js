import React, { useState, useEffect } from "react";
import { decodeToken } from "../services/tokenService";
import { getUserSubscribedSources } from "../services/sourcesService";

export const UserContext = React.createContext();

const Provider = (props) => {
  const [user, setUser] = useState({});

  //getting authenticated user's subscribed sources and putting them with his data in context
  const getUserSources = async () => {
    const { sources } = await getUserSubscribedSources(user._id);
    setUser({ ...user, sources });
  };

  //setting user's data in context provider on mounting
  useEffect(() => {
    try {
      //getting user's data from the token in local storage
      const payload = decodeToken();
      setUser(payload);
    } catch (error) {
      console.error({ error });
    }
  }, []);

  //getting user's sources after being authenticated and his data is set
  useEffect(() => {
    if (user._id) getUserSources();
  }, [JSON.stringify(user)]);
  return (
    <UserContext.Provider value={{ data: { user }, actions: { setUser } }}>
      {props.children}
    </UserContext.Provider>
  );
};
export default Provider;
