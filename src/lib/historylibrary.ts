import { Optional } from "../common";
import { Book } from "./book";
import { LibraryError } from "./errors";
import { Librarian } from "./librarian";
import { Library } from "./library";
import { Member } from "./member";

export default class HistoryLibrary extends Library {
  books: Book[];

  constructor(books: Book[], members: Member[], librarians: Librarian[]) {
    super(members, librarians);
    this.books = [...books];
  }

  static createLibrary(books: Book[], members: Member[]): HistoryLibrary {
    const librarians = members.filter(m => m instanceof Librarian);
    const normalMembers = members.filter(m => !(m instanceof Librarian));
    return new HistoryLibrary(books, normalMembers, librarians);
  }
  
  public get size() : number {
    return this.books.length;
  }

  open(): void {
    if (!this.isOpen) {
      this.isOpen = true;
    }
  }

  close(): void {
    if (this.isOpen) {
      this.isOpen = false;
    }
  }

  addBook(book: Book): void {
    if (this.isOpen) {
      this.books.push(book);
    } else {
      throw new LibraryError("can not add new book. library closed");
    }
  }

  removeBook(isbn: string): void {
    const existingBook = this.books.find(b => b.isbn === isbn);
    if (!existingBook) throw new LibraryError("can not remove book. book not found in library");
    if (!existingBook.isAvailable) throw new LibraryError("can not remove book. book has been borrowed");
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