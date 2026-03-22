import { createContext } from "react";


export const NoteContext = createContext({});

const NoteContextProvider = ({children}) => {

  const myValue = {

  }

  return (
    <NoteContext.Provider value={myValue}>
      {children}
    </NoteContext.Provider>
  )
}

export default NoteContextProvider;