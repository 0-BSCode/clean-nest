import { Author } from './author.entity';

export class Book {
  id: number;
  title: string;
  description?: string;
  price: number;
  authors: Author[];
}
