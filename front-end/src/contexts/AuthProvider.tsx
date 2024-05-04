import React from 'react'

interface IAuthProvider {
  name: string
  setName: (name: string) => void
  email: string
  setEmail: (email: string) => void
}

export const AuthContext = React.createContext<IAuthProvider>({
  name: '',
  setName: () => {},
  email: '',
  setEmail: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  return (
    <AuthContext.Provider value={{ name, setName, email, setEmail }}>
      {children}
    </AuthContext.Provider>
  )
}
