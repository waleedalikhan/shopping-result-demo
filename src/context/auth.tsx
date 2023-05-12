import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext<any>({})

type Props = {
  children?: any
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  let [token, setToken] = useState<any>()

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
