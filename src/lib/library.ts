import { Optional } from "../common";
import { Book } from "./book";
import { Librarian } from "./librarian";
import { Member } from "./member";

export abstract class Library {
  members: Member[];
  librarians: Librarian[];

  constructor(members: Member[], librarians: Librarian[]) {
    this.members = members;
    this.librarians = librarians;
  }

  abstract open(): void

  abstract close(): void

  abstract addBook(book: Book): void;

  abstract removeBook(book: Book): void;

  abstract findBook(isbn: string): Optional<Book>;

  abstract registerMember(member: Member): void;

  abstract getAvailableBooks(): Book[];
}