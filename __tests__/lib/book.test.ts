import {Book, BookError} from "../../src/lib";
import {v4 as uuid} from "uuid";

describe("borrow", () => {
  it("marks a book as unavailable if it is available", () => {
    const isbn = uuid();
    const book = new Book("Title", "Author", isbn, true);
    book.borrow();
    expect(book.isAvailable).toBe(false);
  });

  it("throws a BookError if the book is unavailable", () => {
    const isbn = uuid();
    const book = new Book("Title", "Author", isbn, false);
    const func = () => {
      book.borrow();
    }
    expect(func).toThrow(BookError);
  });
});

describe("returnBook", () => {
  it("marks a book as available if it is unavailable", () => {
    const isbn = uuid();
    const book = new Book("Title", "Author", isbn, false);
    book.returnBook();
    expect(book.isAvailable).toBe(true);
  });

  it("throws a BookError if the book is available", () => {
    const isbn = uuid();
    const book = new Book("Title", "Author", isbn, true);
    const func = () => {
      book.returnBook();
    }
    expect(func).toThrow(BookError);
  });
});