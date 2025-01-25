import { Book } from "./book";
import { Member } from "./member";
import {Library} from "./library";
import {LibrarianError, LibraryError} from "./errors";

export class Librarian extends Member {
  role: string = "librarian";
  library?: Library;

  constructor(id: number, name: string, borrowedBooks: Book[], role?: string) {
    super(id, name, borrowedBooks);
    if (role) this.role = role;
  }

  static fromLibrary(lib: Library, id: number, name: string, borrowedBooks: Book[], role?: string): Librarian {
    const librarian = new Librarian(id, name, borrowedBooks, role);
    librarian.joinLibrary(lib);
    return librarian;
  }

  addBook(book: Book) {
    if (!this.library) throw new LibrarianError("can not add book to library. value of library is not set");
    this.library.addBook(book);
  }

  removeBook(book: Book) {}

  joinLibrary(lib: Library) {
    this.library = lib;
  }
}