import {BookError} from "./errors";

export class Book {
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;

  constructor(title: string, author: string, isbn: string, isAvailable: boolean) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isAvailable = isAvailable;
  }

  borrow(): void {
    if (!this.isAvailable) throw new BookError("failed to borrow book. Book is not available");
    this.isAvailable = false;
  }

  returnBook(): void {
    if (this.isAvailable) throw new BookError("failed to return book. Book is not borrowed");
    this.isAvailable = true;
  }
}