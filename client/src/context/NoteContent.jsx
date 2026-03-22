import { createContext } from "react";


export const NoteContext = createContext({});

const NoteContextProvider = ({children}) => {

  const backendUrl = "http://localhost:4000/api"

  const myValue = {
    backendUrl
  }

  return (
    <NoteContext.Provider value={myValue}>
      {children}
    </NoteContext.Provider>
  )
}

export default NoteContextProvider;