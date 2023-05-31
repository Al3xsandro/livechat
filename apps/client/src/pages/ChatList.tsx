import { MessagePanel } from '../components/pages/chatList/MessagePanel';
import { User } from '../components/pages/chatList/User';
import { useChat } from '../hooks/useChat';

export function ChatList() {
  const { onSelectUser, selectedUser, users, onMessage, messages } = useChat();

  return (
    <div className="flex max-h-screen w-full justify-between">
      <div className="w-[45rem] gap-4 overflow-y-auto bg-gray-800 p-10">
        <h1 className="text-2xl font-medium text-gray-200">
          Quem está online?
        </h1>
        <div className="list-group list-group-flush flex flex-col gap-2 py-4">
          {users?.map((user) => {
            return (
              <User
                key={user.id}
                isSelected={selectedUser?.cpf === user?.cpf}
                setSelectedUser={onSelectUser}
                connected={user.connected}
                user={user}
              />
            );
          })}
        </div>
      </div>
      <div className="flex h-screen w-full items-center justify-center">
        {selectedUser ? (
          <MessagePanel
            user={selectedUser}
            onMessage={onMessage}
            messages={messages}
          />
        ) : (
          <div className="flex w-full justify-center">
            <h1 className="text-center text-2xl text-gray-800">
              Selecione um dos usuários conectados para poder iniciar uma
              conversa
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
