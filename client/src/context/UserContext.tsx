import { createContext, useState, useContext } from "react";
import { ReactNode } from "react";

interface UserContextType {
  userID: string | null;
  setUserID: (id: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userID, setUserID] = useState<string | null>(() => {
    return localStorage.getItem("userID");
  });

  const handleSetUserID = (id: string | null) => {
    if (id === null) {
      localStorage.removeItem("userID");
    } else {
      localStorage.setItem("userID", id);
    }
    setUserID(id);
  };

  return (
    <UserContext.Provider value={{ userID, setUserID: handleSetUserID }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
