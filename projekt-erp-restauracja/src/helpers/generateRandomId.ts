import { v4 as uuidv4 } from 'uuid';

export class GenerateRandomId {
  generateId(): string {
    return uuidv4();
  }
}