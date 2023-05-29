export class ConsoleErrror extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export const Conflict = (message: string) => new ConsoleErrror(message);
