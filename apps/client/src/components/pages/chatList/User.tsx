import { Dispatch, SetStateAction } from 'react';
import { IUser } from '../../../interfaces/global';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useChat } from '../../../hooks/useChat';

interface IProps {
  connected: boolean;
  isSelected?: boolean;
  setSelectedUser: Dispatch<SetStateAction<IUser | undefined>>;
  user: IUser;
}

export function User({ connected, isSelected, setSelectedUser, user }: IProps) {
  const { user: user_authenticated } = useAuth();
  const { setMessages } = useChat();

  return (
    <div
      className={`list-group-item flex items-center justify-start gap-2 rounded-md px-3 py-4 shadow-md ${
        isSelected ? 'bg-gray-400' : 'bg-gray-300'
      } d-flex justify-content-between cursor-pointer transition ease-in-out hover:opacity-80`}
      onClick={() => {
        if (user.id === user_authenticated?.id) {
          toast.error('Você não pode selecionar a si mesmo');
        } else {
          setSelectedUser(user);
          setMessages([]);
        }
      }}
    >
      <div className="relative m-1 mr-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-xl uppercase text-white">
        l
      </div>
      <div className="flex flex-col">
        <div
          className={`font-medium ${
            isSelected ? 'text-slate-200' : 'text-gray-700'
          }`}
        >
          {user.id} {user.id === user_authenticated?.id ? '(você)' : ''}
        </div>
        <div className={`${connected ? 'text-green-600' : 'text-red-600'}`}>
          {connected ? 'online' : 'offline'}
        </div>
      </div>
    </div>
  );
}
