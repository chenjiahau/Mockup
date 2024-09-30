import { useContext } from "react";
import { AppContext } from "./AppContext";

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }

  return context;
};

export default useAppContext;
