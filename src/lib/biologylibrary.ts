import { Optional } from "../common";
import { Book } from "./book";
import { Librarian } from "./librarian";
import { Library } from "./library";
import { Member } from "./member";
import {LibraryError} from "./errors";

export class BiologyLibrary extends Library {
  books: Book[];

  private constructor(books: Book[], members: Member[], librarians: Librarian[]) {
    super(members, librarians);
    this.books = books;
  }

  static createLibrary(books: Book[], members: Member[]): BiologyLibrary {
    const librarians = members.filter(m => m instanceof Librarian);
    const normalMembers = members.filter(m => !(m instanceof Librarian));
    return new BiologyLibrary(books, normalMembers, librarians);
  }

  public get size() : number {
    return this.books.length;
  }

  public get totalMembers(): number {
    return this.members.length + this.librarians.length;
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
    return this.books.find(b => b.isbn === isbn);
  }

  registerMember(member: Member): void {
    if (member instanceof Librarian) {
      this.registerLibrarian(member);
    } else {
      this.registerNonLibrarian(member);
    }
  }

  private registerLibrarian(librarian: Librarian) {
    if (this.librarians.includes(librarian)) throw new LibraryError("failed to register member. member is already a librarian");
    this.librarians.push(librarian);
  }

  private registerNonLibrarian(nonLibrarian: Member) {
    if (this.members.includes(nonLibrarian)) throw new LibraryError("failed to register member. member already exists");
    this.members.push(nonLibrarian);
  }

  getAvailableBooks(): Book[] {
    if ((this.books.length) === 0) return this.books;
    return this.books.filter(book => book.isAvailable);
  }
}