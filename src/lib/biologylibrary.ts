import { Optional } from "../common";
import { Book } from "./book";
import { Librarian } from "./librarian";
import { Library } from "./library";
import { Member } from "./member";

export class BiologyLibrary extends Library {
  books: Book[];

  constructor(books: Book[], members: Member[], librarians: Librarian[]) {
    super(members, librarians);
    this.books = books;
  }

  open(): void {
  }

  close(): void {
  }
  
  addBook(book: Book): void {
    throw new Error("Method not implemented.");
  }

  removeBook(book: Book): void {
    throw new Error("Method not implemented.");
  }
  
  findBook(isbn: string): Optional<Book> {
    throw new Error("Method not implemented.");
  }

  registerMember(member: Member): void {
    throw new Error("Method not implemented.");
  }

  getAvailableBooks(): Book[] {
    throw new Error("Method not implemented.");
  }
}