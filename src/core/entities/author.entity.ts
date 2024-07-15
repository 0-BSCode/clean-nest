import { Book } from './book.entity';

export class Author {
  id: number;
  name: string;
  description?: string;
  books: Book[];
}
