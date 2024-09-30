import { useState, createContext } from "react";
import App from "./App";

interface AppContextType {
  name: string;
  version: string;
  setName: (name: string) => void;
  setVersion: (version: string) => void;
}

export const AppContext = createContext<AppContextType>({
  name: "",
  version: "",
  setName: () => {},
  setVersion: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState("React");
  const [version, setVersion] = useState("17.0.2");

  return (
    <AppContext.Provider value={{ name, version, setName, setVersion }}>
      {children}
    </AppContext.Provider>
  );
};
