import React, { createContext, useState } from 'react';

export const PageContext = createContext();
export const LoggedContext = createContext();



export const PageProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [page, setPage] = useState("signup");
  const [logged, setLogged] = useState(false)

  
  return (
    <PageContext.Provider value={{ page, setPage,logged, setLogged,username, setUsername }}>
    
      {children}
    </PageContext.Provider>
  );
};
 