import { createContext, useEffect, useState } from "react";
import { api } from "../api";
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router'
import { useToast } from "@chakra-ui/react";
import { User } from "../interfaces/user";
import { AuthContextProps, SignInData } from "../interfaces/authenticate";

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const toast = useToast();

  const isAuthenticated = !!user;

  useEffect(() => {
    getValidatedUserToken();
  }, [])

  async function signIn({ email, password }: SignInData) {
    await api.post("auth", { email, password })
      .then((response) => {
        const token = response.data.token

        if (token) {
          setUser(response.data.user)

          setCookie(undefined, 'pontodesk.token', token,
            { maxAge: 60 * 60 * 3 } // 3 hour
          );

          localStorage.setItem('currentUser', JSON.stringify(response.data.user))

          toast({
            title: 'Login realizado com sucesso!',
            position: 'top-right',
            status: 'success',
            duration: 2000, // 2 seconds
            isClosable: true,
          })

          return (
            setTimeout(() => {
              if (response.data.user.admin === true) {
                Router.push('dashboard')
              } else {
                Router.push('user-ticket-management')
              }
            }, 500) // 500 miliseconds 
          )
        } else {
          toast({
            title: 'Usuário ou senha inválidos!',
            position: 'top-right',
            status: 'error',
            duration: 2000, // 2 seconds
            isClosable: true,
          })
        }
      }).catch((error) => {
        toast({
          title: `${error.message}`,
          position: 'top-right',
          status: 'error',
          isClosable: true,
        })
      })
  }

  async function getValidatedUserToken() {
    const { 'pontodesk.token': token } = await parseCookies();

    if (token) {
      await api.get('auth_token')
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          toast({
            title: `${error.message}`,
            position: 'top-right',
            status: 'error',
            duration: 2000, // 2 seconds
            isClosable: true,
          })
        });
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}