import { Book } from "./book";
import {MemberError} from "./errors";

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
    book.borrow();
    this.borrowedBooks.push(book);
  }

  returnBook(book: Book): void {
    const indexOfBorrowedBook = this.borrowedBooks.findIndex(b => b === book);
    if (indexOfBorrowedBook === -1) throw new MemberError("failed to return book. Book not borrowed by this member");

    this.borrowedBooks[indexOfBorrowedBook].returnBook();
    this.borrowedBooks.splice(indexOfBorrowedBook, 1);
  }
}