import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 } from "uuid";

const StorageKey = {
  userId: "USER_ID",
};

type UserContext = {
  userId: string;
};

const defaultValue: UserContext = {
  userId: localStorage.getItem(StorageKey.userId) || v4(),
};

export const UserContext = createContext<UserContext>(defaultValue);

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  useEffect(() => {
    // If there isn't a userId in localStorage yet, save the one we already generated.
    if (!localStorage.getItem(StorageKey.userId)) {
      localStorage.setItem(StorageKey.userId, defaultValue.userId);
    }
  }, []);

  return (
    <UserContext.Provider value={defaultValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("useUserContext() must be used within a UserContextProvider.");
  }

  return context;
};
