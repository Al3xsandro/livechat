import { MessagePanel } from '../components/pages/chatList/MessagePanel';
import { User } from '../components/pages/chatList/User';
import { useChat } from '../hooks/useChat';

export function ChatList() {
  const { onSelectUser, selectedUser, users } = useChat();

  return (
    <div className="relative flex w-full justify-between">
      <div className="relative left-0 top-0 min-h-screen w-[60rem] bg-gray-800 p-10">
        <h1 className="text-2xl font-medium text-gray-200">
          Quem está online?
        </h1>
        <div className="list-group list-group-flush">
          {users?.map((user) => {
            return (
              <User
                key={user.cpf}
                // isSelected={(selectedUser && selectedUser) === user?.cpf}
                // setSelectedUser={onSelectUser}
                connected={false}
                user={user}
              />
            );
          })}
        </div>
      </div>
      <div className="flex h-screen w-full items-center justify-center">
        {/* {selectedUser && (
            <MessagePanel user={selectedUser} onMessage={onMessage} />
          )} */}
      </div>
    </div>
  );
}
