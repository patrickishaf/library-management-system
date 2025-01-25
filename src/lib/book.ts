export class Book {
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;

  constructor(title: string, author: string, isbn: string, isAvailable: boolean) {
    this.title =title;
    this.author = author;
    this.isbn = isbn;
    this.isAvailable = isAvailable;
  }

  borrow(): void {
    this.isAvailable = false;
  }

  returnBook(): void {
    this.isAvailable = true;
  }
}