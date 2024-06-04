export interface IProduct {
  readonly id?: number;
  name: string;
  author_books: string;
  price: number;
  description: string;
  genre: string;
  img?: string;
  year: number;
  userId: number;
}
