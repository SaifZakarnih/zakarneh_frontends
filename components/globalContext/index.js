import React, {useState, createContext} from 'react';
const Context = createContext();

const Provider = ({children}) => {
  const [domain, setDomain] = useState('https://covid19api.herokuapp.com');
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const globalContext = {
    domain,
    setToken,
    token,
    isLoading,
    setIsLoading,
    setUsername,
    setPassword,
    username,
    password,
  };

  return <Context.Provider value={globalContext}>{children}</Context.Provider>;
};

export {Context, Provider};
