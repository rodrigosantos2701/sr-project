import React, { useState }from 'react'

export const StoredContext = React.createContext({});

export const StoredProvider = (props) => {
  const [value, setValue] = useState (0)
  const [edit, setEdit] = useState (false)



  return (
    <StoredContext.Provider value={{value, setValue, edit, setEdit}}>
      {props.children}
    </StoredContext.Provider>
  )
}