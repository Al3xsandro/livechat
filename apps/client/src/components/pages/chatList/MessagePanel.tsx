import { Fragment, useEffect, useState } from 'react';
import { IMessage, IUser } from '../../../interfaces/global';

interface IProps {
  user: IUser;
  onMessage: (content: string) => void;
  messages: IMessage[] | undefined | null;
}

export function MessagePanel({ onMessage, user, messages }: IProps) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log(messages);
  }, [messages, onMessage, setMessage]);

  return (
    <div className="flex h-full w-full flex-col justify-between">
      {user.connected ? (
        <>
          <div
            id="messages"
            className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col space-y-4 overflow-y-auto p-3"
          >
            {messages?.map((message, index) => (
              <Fragment key={index}>
                {message.fromSelf ? (
                  <div
                    className="chat-message"
                    key={`message-self-${message.from}-${index}`}
                  >
                    <div className="flex items-end">
                      <div className="order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 text-xs">
                        <div>
                          <span className="inline-block rounded-lg bg-gray-300 px-4 py-2 text-gray-600">
                            {message.content}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="chat-message"
                    key={`message-self-${message.from}-${index}`}
                  >
                    <div className="flex items-end justify-end">
                      <div className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-xs">
                        <div>
                          <span className="inline-block rounded-lg rounded-br-none bg-blue-600 px-4 py-2 text-white">
                            {message.content}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <div className="mb-2 border-t-2 border-gray-300 px-4 pt-2 sm:mb-0">
            <div className="relative flex justify-between">
              <input
                type="text"
                placeholder="Escreva sua mensagem!"
                value={message}
                onChange={(e) => {
                  e.preventDefault();
                  if (e.target.value) {
                    setMessage(e.target.value);
                  }
                }}
                className="w-full rounded-md bg-gray-200 py-3 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
              />
              <div className="absolute inset-y-0 right-0 hidden items-center sm:flex">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-2 py-2 text-white transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none"
                  onClick={() => {
                    if (message != '') {
                      onMessage(message);
                      setMessage('');
                    }
                  }}
                >
                  <span className="text-center font-bold">Enviar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="ml-2 h-6 w-6 rotate-90 transform"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-center text-2xl text-gray-800">
            Este usuário está offline
          </p>
        </div>
      )}
    </div>
  );
}
