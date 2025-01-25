import { Optional } from "../common";
import { Book } from "./book";
import { Librarian } from "./librarian";
import { Member } from "./member";

export abstract class Library {
  members: Member[];
  librarians: Librarian[];
  isOpen: boolean;

  constructor(members: Member[], librarians: Librarian[], isOpen: boolean = false) {
    this.members = members;
    this.librarians = librarians;
    this.isOpen = false;
  }

  abstract open(): void

  abstract close(): void

  abstract addBook(book: Book): void;

  abstract removeBook(book: Book): void;

  abstract findBook(isbn: string): Optional<Book>;

  abstract registerMember(member: Member): void;

  abstract getAvailableBooks(): Book[];
}