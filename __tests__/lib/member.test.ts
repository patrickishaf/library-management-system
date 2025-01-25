import {Book, BookError, Member, MemberError} from "../../src/lib";
import {v4 as uuid} from "uuid";

describe("borrowBook", () => {
  it("marks a book as unavailable if it is available", () => {
    const book = new Book("Title", "Author", uuid(), true);
    const member = new Member(1, "Name", []);
    member.borrowBook(book);

    expect(book.isAvailable).toBe(false);
    expect(member.borrowedBooks.length).toBe(1);
  });

  it("throws an error if the book is unavailable", () => {
    const book = new Book("Title", "Author", uuid(), false);
    const member = new Member(1, "Name", []);
    const func = () => {
      member.borrowBook(book);
    }

    expect(func).toThrow(BookError);
  });
});

describe("returnBook", () => {
  it("marks a book as available if it was borrowed by the member and it is unavailable", () => {
    const book = new Book("Title", "Author", uuid(), true);
    const member = new Member(1, "Name", []);
    member.borrowBook(book);
    member.returnBook(book);

    expect(member.borrowedBooks.includes(book)).toBe(false);
  });

  it("throws a MemberError if it was not borrowed by this member", () => {
    const book = new Book("Title", "Author", uuid(), true);
    const member1 = new Member(1, "Name", []);
    const member2 = new Member(2, "Name", []);

    member1.borrowBook(book);
    const func = () => {
      member2.returnBook(book);
    }

    expect(func).toThrow(MemberError);
  });

  it("throws a BookError if it was borrowed by the member and somehow the book is available(not meant to happen)", () => {
    const book = new Book("Title", "Author", uuid(), true);
    const member = new Member(1, "Name", []);
    member.borrowBook(book);
    member.borrowedBooks[0].isAvailable = true;
    const func = () => {
      member.returnBook(book);
    }

    expect(func).toThrow(BookError);
  });
});