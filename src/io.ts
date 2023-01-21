export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    // custom types
    typing: (user: string) => void;
    chatMessage: (message: string, user: string) => void;
}
  
export interface ClientToServerEvents {
    hello: () => void;
    newUser: (clientsCount: number) => void
    typing: (user: string) => void
    messageForAllUsers: (message: string) => void
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}