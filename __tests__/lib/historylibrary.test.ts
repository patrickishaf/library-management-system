import { Book } from "../../src/lib/book";
import HistoryLibrary from "../../src/lib/historylibrary";
import { v4 as uuid } from "uuid";
import { Member } from "../../src/lib/member";
import { Librarian } from "../../src/lib/librarian";

describe("HistoryLibrary", () => {
  let books: Book[];
  let members: Member[];

  beforeEach(() => {
    books = [
      {title: "Title 0", author: "Author 0", isbn: uuid(), isAvailable: true },
      {title: "Title 1", author: "Author 1", isbn: uuid(), isAvailable: true },
      {title: "Title 2", author: "Author 2", isbn: uuid(), isAvailable: true },
      {title: "Title 3", author: "Author 3", isbn: uuid(), isAvailable: true },
      {title: "Title 4", author: "Author 4", isbn: uuid(), isAvailable: true },
      {title: "Title 5", author: "Author 5", isbn: uuid(), isAvailable: true },
      {title: "Title 6", author: "Author 6", isbn: uuid(), isAvailable: true },
    ].map((b) => new Book(b.title, b.author, b.isbn, b.isAvailable));
    members = [
      new Librarian(1, "Librarian Name 1", []),
      new Member(2, "Member Name 2", []),
      new Member(3, "Member Name 3", []),
      new Member(4, "Member Name 4", []),
    ];
  });

  describe("createLibrary", () => {
    it("creates the right amount of members and librarians", () => {
      const lib = HistoryLibrary.createLibrary(books, members);
      expect(lib.members.length).toBe(3);
      expect(lib.librarians.length).toBe(1);
    });
  });

  describe("open", () => {
    it("opens the library successfully", () => {
      const lib = HistoryLibrary.createLibrary(books, members);
      lib.open();
      expect(lib.isOpen).toBe(true);
    });
  });
  
  describe("close", () => {
    it("closes the library successfully", () => {
      const lib = HistoryLibrary.createLibrary(books, members);
      lib.close();
      expect(lib.isOpen).toBe(false);
    });
  });

  describe("addBook", () => {
    it("adds a book if library is open", () => {});
    it("does not borrow a book if it the library is closed", () => {});
    it("does not borrow a book if it is unavailable", () => {});
  });
});