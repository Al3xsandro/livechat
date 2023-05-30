interface IUser {
  id: string;
  cpf: string;
}

interface SessionStore {
  findSession(id: string): string | undefined;
  saveSession(id: string, session: IUser): void;
  findAllSessions(): string[];
}

export class InMemorySessionStore implements SessionStore {
  private session: Map<string, string>;
  constructor() {
    this.session = new Map<string, string>();
  }

  findSession(id: string) {
    return this.session.get(id);
  }
  saveSession(id: string, session: IUser): void {
    this.session.set(id, JSON.stringify(session));
  }
  findAllSessions(): string[] {
    return [...this.session.values()];
  }
}
