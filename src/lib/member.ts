import { Book } from "./book";

export class Member {
  id: number;
  name: string;
  borrowedBooks: Book[];

  constructor(id: number, name: string, borrowedBooks: Book[]) {
    this.id = id;
    this.name = name;
    this.borrowedBooks = borrowedBooks;
  }

  borrowBook(book: Book): void {
  }

  returnBook(book: Book): void {}
}