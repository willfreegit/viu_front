import React, { createContext, useContext, useState, useEffect } from 'react'
import { json } from 'react-router-dom'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    setUser(storedUser)
  }, [])

  const getUser = () => {
    return JSON.parse(localStorage.getItem('user'))
  }

  const getToken = () => {
    return JSON.parse(localStorage.getItem('token'))
  }

  const userIsAuthenticated = () => {
    let storedUser = localStorage.getItem('user')
    if (!storedUser) {
      return false
    }
    storedUser = JSON.parse(storedUser)

    // if user has token expired, logout user
    if (Date.now() > storedUser.data.exp * 1000) {
      userLogout()
      return false
    }
    return true
  }

  const userLogin = user => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  const userToken = token =>{
    localStorage.setItem('token', JSON.stringify(token))
    setToken(token)
  }

  const userLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const contextValue = {
    user,
    getUser,
    getToken,
    userIsAuthenticated,
    userLogin,
    userToken,
    userLogout,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

export function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider }