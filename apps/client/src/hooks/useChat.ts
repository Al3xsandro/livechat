import { useEffect, useState } from 'react';
import socket from 'socket.io-client';
import { IUser } from '../interfaces/global';

export function useChat() {
  const [selectedUser, onSelectUser] = useState<IUser>();
  const [users, setUsers] = useState<IUser[]>();

  const token = localStorage.getItem('@chatapp:token') || '';

  const io = socket(import.meta.env.VITE_BASE_URL, {
    transports: ['websocket', 'polling'],
    auth: { token },
  });

  useEffect(() => {
    io.on('user-connected', (user) => {
      console.log(user);
    });

    io.on('users', (users) => {
      console.log(users);
    });

    return () => {};
  }, []);

  return {
    io,
    onSelectUser,
    selectedUser,
    users,
  };
}
