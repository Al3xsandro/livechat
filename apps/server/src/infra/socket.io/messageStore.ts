export interface IMessage {
  from: string;
  to: string;
  content: string;
}

export interface MessageStore {
  saveMessage(message: IMessage): void;
  findMessagesForUser(user_id: string): IMessage[];
}

export class InMemoreMessageStore implements MessageStore {
  private messages: IMessage[];
  constructor() {
    this.messages = [];
  }

  saveMessage(message: IMessage): void {
    this.messages.push(message);
  }
  findMessagesForUser(user_id: string): IMessage[] {
    return this.messages.filter(
      ({ from, to }) => from === user_id || to === user_id
    );
  }
}
