import { useState, createContext } from "react";

interface AppContextType {
  version: string;
  setVersion: (version: string) => void;
}

export const AppContext = createContext<AppContextType>({
  version: "",
  setVersion: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [version, setVersion] = useState("18.3.3");

  return (
    <AppContext.Provider value={{ version, setVersion }}>
      {children}
    </AppContext.Provider>
  );
};
