interface Note {
  id: number;
  message: string;
  encryption: string;
  timestamp: string | Date;
}

interface Encryption {
  name: string;
  description?: string;
}
export { Note, Encryption };
