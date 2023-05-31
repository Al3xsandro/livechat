export interface IMessage {
  from: string;
  to: string;
  fromSelf?: boolean;
  content: string;
}

export interface IUser {
  id: string;
  cpf: string;
  messages: IMessage[];
  connected: boolean;
}

export interface ISignIn {
  cpf: string;
  password: string;
}

export interface ISignInOutput {
  id: string;
  cpf: string;
  token: string;
}
