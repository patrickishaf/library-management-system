import { Book } from "../../src/lib/book";
import HistoryLibrary from "../../src/lib/historylibrary";
import { v4 as uuid } from "uuid";
import { Member } from "../../src/lib/member";
import { Librarian } from "../../src/lib/librarian";
import { BookAdditionError } from "../../src/lib/errors";

describe("HistoryLibrary", () => {
  let books: Book[];
  let members: Member[];

  beforeEach(() => {
    books = [
      {title: "Title 0", author: "Author", isbn: uuid(), isAvailable: true },
      {title: "Title 1", author: "Author", isbn: uuid(), isAvailable: true },
      {title: "Title 2", author: "Author", isbn: uuid(), isAvailable: true },
      {title: "Title 3", author: "Author", isbn: uuid(), isAvailable: true },
      {title: "Title 4", author: "Author", isbn: uuid(), isAvailable: true },
      {title: "Title 5", author: "Author", isbn: uuid(), isAvailable: true },
      {title: "Title 6", author: "Author", isbn: uuid(), isAvailable: true },
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
    it("adds a book if library is open", () => {
      const lib = HistoryLibrary.createLibrary(books, members);
      lib.open();
      const isbn = uuid();
      lib.addBook(new Book("Added Title 1", "Author", isbn, true));
      expect(lib.size).toBe(books.length + 1);
    });

    it("does not add a book if it the library is closed", () => {
      const lib = HistoryLibrary.createLibrary(books, members);
      lib.close();
      const isbn = uuid();
      const func = () => {
        lib.addBook(new Book("Added Title 2", "Author", isbn, true));
      }
      expect(func).toThrow(BookAdditionError);
    });
  });
});