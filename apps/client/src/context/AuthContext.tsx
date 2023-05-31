import { createContext, ReactNode, useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import { ISignInOutput, IUser } from '../interfaces/global';
import { api } from '../services/api';

type IAuthProvider = {
  children: ReactNode;
};

interface ISignIn {
  cpf: string;
  password: string;
}

interface IAuthContext {
  user: IUser | null;
  signOut: () => void;
  signIn: ({ cpf, password }: ISignIn) => void;
  setIsLoading(value: boolean): void;
  isLoading: boolean;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  function setIsLoading(value: boolean) {
    return setLoading(value);
  }

  async function signIn({ cpf, password }: ISignIn): Promise<void> {
    try {
      await api
        .post<ISignInOutput>('/users/session', {
          cpf,
          password,
        })

        .then((response) => {
          const data = response.data;

          localStorage.setItem('@chatapp:token', data.token);
          api.defaults.headers.common.authorization = `Bearer ${data.token}`;

          setUser({
            id: data.id,
            cpf: data.cpf,
            messages: [],
            connected: true,
          });

          setLoading(false);

          return navigate('/', { replace: true });
        })
        .catch((err) => {
          setLoading(false);
          return toast.error(err.response.data);
        });
    } catch (err) {
      setLoading(false);
      toast.error('Algo deu errado.');
    }
  }
  function signOut() {
    localStorage.removeItem('@chatapp:token');
    toast.success('Sessão encerrada com sucesso');
    setUser(null);
    return navigate('/', { replace: true });
  }

  useEffect(() => {
    const token = localStorage.getItem('@chatapp:token');
    api.defaults.headers.common.authorization = `Bearer ${token}`;

    if (token) {
      api
        .get('/users/me')
        .then((response) => response.data)
        .then((data) => {
          setUser({
            id: data.id,
            cpf: data.cpf,
            connected: true,
            messages: [],
          });
        })
        .catch(() => {
          localStorage.removeItem('@chatapp:token');
          setUser(null);

          return navigate('/', { replace: true });
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, setIsLoading, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
