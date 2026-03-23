import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NoteContext = createContext({});

const NoteContextProvider = ({ children }) => {
  const backendUrl = "http://localhost:4000/api";

  const navigate = useNavigate("");

  const [userName, setUserName] = useState(localStorage.getItem("name") || "");

  const [search, setSearch] = useState("");

  const myValue = {
    backendUrl,
    navigate,
    userName,
    setUserName,
    search, 
    setSearch
  };

  return (
    <NoteContext.Provider value={myValue}>{children}</NoteContext.Provider>
  );
};

export default NoteContextProvider;
