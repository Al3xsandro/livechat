import { useEffect, useState } from 'react';
import socket from 'socket.io-client';
import { IMessage, IUser } from '../interfaces/global';
import { useAuth } from './useAuth';

export function useChat() {
  const [selectedUser, onSelectUser] = useState<IUser | undefined>();
  const [users, setUsers] = useState<IUser[]>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { user } = useAuth();

  const token = localStorage.getItem('@chatapp:token') || '';

  const io = socket(import.meta.env.VITE_BASE_URL, {
    transports: ['websocket', 'polling'],
    auth: { token },
  });

  function onMessage(content: string) {
    if (selectedUser) {
      io.emit('private-message', {
        content,
        from: user?.id,
        to: selectedUser.id,
      });
    }
  }

  useEffect(() => {
    io.connect();

    io.on('users', (users) => {
      setUsers(users);
    });

    io.on('user-connected', (user) => {
      setUsers((prevState) => {
        const alreadyExists = prevState?.find(
          (prevUser) => prevUser.id === user.id
        );
        if (!alreadyExists && prevState) {
          return [...prevState, user];
        }

        return prevState;
      });
    });

    io.on('user-disconnected', (id) => {
      users?.forEach((user) => {
        if (user.id === id) {
          user.connected = false;
        }
      });
    });

    io.on('disconnect', () => {
      users?.forEach((userLocal) => {
        if (userLocal.id === user?.id) {
          userLocal.connected = false;
        }
      });
    });

    io.on('private-message', ({ content, from, to }: IMessage) => {
      setMessages((prevState) => {
        return [
          ...prevState,
          {
            content,
            fromSelf: to === user?.id,
            from,
            to,
          },
        ];
      });
    });

    return () => {
      io.off('connect');
      io.off('disconnect');
      io.off('users');
      io.off('user-connected');
      io.off('user-disconnected');
      io.off('private-message');
    };
  }, []);

  return {
    io,
    onSelectUser,
    selectedUser,
    users,
    onMessage,
    messages,
    setMessages,
  };
}
