export interface IMessage {
  fromSelf: string;
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
