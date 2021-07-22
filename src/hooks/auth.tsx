import React, { createContext, useContext, useState, ReactNode, useEffect } from "react"; // Importação para criar contexto
import * as AuthSession from 'expo-auth-session';  //Importa biblioteca de autenticação
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";
import { COLLECTION_USERS } from "../configs/database";

// Busca os parametros direto das variaveis de ambiente
const { SCOPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

type AuthContextData = {
  user: User;
  loading: boolean;
  singIn: () => Promise<void>; // Função do tipo Promise, pois pode demorar para apresentar retorno
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string; // Token é opcional porque o usuário pode cancelar a operação
    error?: string;
  }
}

// Criando um contexto com valor inicial de objeto vazio do tipo definido acima
export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) { // Funnção recebera um objeto node que será o filho
  const [user, setUser] = useState<User>({} as User); // Atribuimos um usuário inicialmente vazio
  const [loading, setLoading] = useState(false);

  async function singIn() { // Função assincrona
    try {
      setLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession
        .startAsync({ authUrl }) as AuthorizationResponse; //Adiciona a tipagem definida no topo

      if (type === "success" && !params.error) {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`; //injeta o token no cabeçalho de todas as requisições

        const userInfo = await api.get('/users/@me'); // Busca dados do usuário

        const firstName = userInfo.data.username.split(' ')[0]; // Pega o primeiro nome do user
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`; // Constroi rota para buscar imagem

        const userData = {
          ...userInfo.data,
          firstName,
          token: params.access_token
        }

        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData)) // Stringify converte para texto
        setUser(userData);
      }
    } catch {
      throw new Error('Não foi possível autenticar');
    } finally {
      setLoading(false);
    }
  }

  //Carrega os dados da materia
  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USERS);

    if (storage) {
      const userLogged = JSON.parse(storage) as User;
      api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

      setUser(userLogged);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{  // Criamos nosso context provider
      user,
      loading,
      singIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Vamos criar nosso próprio hook
function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

// Vamos exportar nosso hook
export {
  AuthProvider,
  useAuth,
}