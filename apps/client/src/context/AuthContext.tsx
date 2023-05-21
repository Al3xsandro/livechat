import { createContext, ReactNode, useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import { IUser } from '../interfaces/global';
import { api } from '../services/api';

type IAuthProvider = {
  children: ReactNode;
};

interface ISignIn {
  user: {
    id: string;
    cpf: string;
  };
  token: string;
}

interface IAuthContext {
  user: IUser | null;
  signOut: () => void;
  signIn: ({ user, token }: ISignIn) => void;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  function signIn({ user, token }: ISignIn) {
    localStorage.setItem('@chatapp:token', token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    return setUser(user);
  }

  function signOut() {
    localStorage.removeItem('@chatapp:token');
    toast.success('Sessão encerrada com sucesso');
    setUser(null);
    return navigate('/', { replace: true });
  }

  //   useEffect(() => {
  //     const token = localStorage.getItem('@chatapp:token:token');
  //     api.defaults.headers.common.authorization = `Bearer ${token}`;

  //     if (token) {
  //       session()
  //         .then((data) => {
  //           setUser(data.data);
  //         })
  //         .catch(() => {
  //           localStorage.removeItem('@chatapp:token:token');
  //           setUser(null);

  //           return navigate('/', { replace: true });
  //         });
  //     }
  //   }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
