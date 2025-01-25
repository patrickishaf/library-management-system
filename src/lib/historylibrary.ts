import { Optional } from "../common";
import { Book } from "./book";
import { Librarian } from "./librarian";
import { Library } from "./library";
import { Member } from "./member";

export default class HistoryLibrary extends Library {
  books: Book[];

  constructor(books: Book[], members: Member[], librarians: Librarian[]) {
    super(members, librarians);
    this.books = books;
  }

  static createLibrary(books: Book[], members: Member[]): HistoryLibrary {
    const librarians = members.filter(m => m instanceof Librarian);
    const normalMembers = members.filter(m => !(m instanceof Librarian));
    return new HistoryLibrary(books, normalMembers, librarians);
  }

  open(): void {
    if (!this.isOpen) {
      this.isOpen = true;
    }
  }

  close(): void {
    if (this.isOpen) 
      this.isOpen = false;
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