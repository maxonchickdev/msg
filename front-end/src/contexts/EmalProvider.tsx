import React from 'react'

interface IEmailProvider {
  email: string
  setEmail: (email: string) => void
}

export const EmailContext = React.createContext<IEmailProvider>({
  email: '',
  setEmail: () => {},
})

export const EmailProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = React.useState<string>('')
  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  )
}
