import { Optional } from "../common";
import { Book } from "./book";
import { Librarian } from "./librarian";
import { Member } from "./member";
import {LibraryError, MemberError} from "./errors";

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

  abstract removeBook(isbn: string): void;

  abstract findBook(isbn: string): Optional<Book>;

  abstract registerMember(member: Member): void;

  abstract getAvailableBooks(): Book[];

  protected registerLibrarian(librarian: Librarian) {
    if (this.librarians.includes(librarian)) throw new LibraryError("failed to register member. member is already a librarian");
    librarian.joinLibrary(this);
    this.librarians.push(librarian);
  }

  protected registerNonLibrarian(nonLibrarian: Member) {
    if (this.members.includes(nonLibrarian)) throw new LibraryError("failed to register member. member already exists");
    this.members.push(nonLibrarian);
  }

  lendBook(book: Book, member: Member): void {
    const indexOfExistingMember = this.members.findIndex(m => m === member);
    if (indexOfExistingMember === -1) throw new MemberError("can not lend book. member is not a member of the library");

    const existingMember = this.members[indexOfExistingMember];
    existingMember.borrowBook(book);
  }
}