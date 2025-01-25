import { Book } from "./book";
import { Member } from "./member";

export class Librarian extends Member {
  role: string = "librarian";

  constructor(id: number, name: string, borrowedBooks: Book[], role?: string) {
    super(id, name, borrowedBooks);
    if (role) this.role = role;
  }

  addBook(book: Book) {}

  removeBook(book: Book) {}
}