import { Book } from "../../src/lib/book";
import HistoryLibrary from "../../src/lib/historylibrary";
import { v4 as uuid } from "uuid";
import { Member } from "../../src/lib/member";
import { Librarian } from "../../src/lib/librarian";
import { LibraryError } from "../../src/lib/errors";

const bookData = [
  {title: "Title 0", author: "Author", isbn: uuid(), isAvailable: true },
  {title: "Title 1", author: "Author", isbn: uuid(), isAvailable: true },
  {title: "Title 2", author: "Author", isbn: uuid(), isAvailable: true },
  {title: "Title 3", author: "Author", isbn: uuid(), isAvailable: true },
  {title: "Title 4", author: "Author", isbn: uuid(), isAvailable: true },
  {title: "Title 5", author: "Author", isbn: uuid(), isAvailable: true },
  {title: "Title 6", author: "Author", isbn: uuid(), isAvailable: true },
].map((b) => new Book(b.title, b.author, b.isbn, b.isAvailable));
const memberData = [
  new Librarian(1, "Librarian Name 1", []),
  new Member(2, "Member Name 2", []),
  new Member(3, "Member Name 3", []),
  new Member(4, "Member Name 4", []),
];

describe("HistoryLibrary", () => {
  let books: Book[];
  let members: Member[];

  beforeEach(() => {
    books = [...bookData];
    members = [...memberData];
  });

  describe("createLibrary", () => {
    let books: Book[];
    let members: Member[];

    beforeEach(() => {
      books = [...bookData];
      members = [...memberData];
    });

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
      expect(func).toThrow(LibraryError);
    });
  });

  describe("removeBook", () => {
    let lib: HistoryLibrary;

    beforeEach(() => {
      lib = HistoryLibrary.createLibrary(books, members);
    });

    it("does not remove a book if the book is not in the library", () => {
      const books = [
        {title: "Title 0", author: "Author", isbn: uuid(), isAvailable: true },
        {title: "Title 1", author: "Author", isbn: uuid(), isAvailable: true },
        {title: "Title 2", author: "Author", isbn: uuid(), isAvailable: true },
        {title: "Title 3", author: "Author", isbn: uuid(), isAvailable: true },
        {title: "Title 4", author: "Author", isbn: uuid(), isAvailable: true },
        {title: "Title 5", author: "Author", isbn: uuid(), isAvailable: true },
        {title: "Title 6", author: "Author", isbn: uuid(), isAvailable: true },
      ].map((b) => new Book(b.title, b.author, b.isbn, b.isAvailable));
      
      const lib = HistoryLibrary.createLibrary(books, members);
      const func = () => {
        lib.removeBook("wrong_isbn");
      }
      expect(func).toThrow(LibraryError);
    });

    it("does not remove a book if the book is borrowed", () => {
      lib.open();
      lib.addBook(new Book("Added Title 2", "Author", "isbn()", false));
      const func = () => {
        lib.removeBook("isbn()");
      }
      expect(func).toThrow(LibraryError);
    });

    it("does not remove a book if the library is closed", () => {
      lib.close();
      const func = () => {
        lib.removeBook("isbn()");
      }
      expect(func).toThrow(LibraryError);
    });
  });

  describe("findBook", () => {
    let isbn1: string;
    let isbn2: string;
    let books: Book[];
    let members: Member[];
    let lib: HistoryLibrary;

    beforeEach(() => {
      isbn1 = uuid();
      isbn2 = uuid();
      books = [
        {title: "Title 0", author: "Author", isbn: isbn1, isAvailable: true },
        {title: "Title 1", author: "Author", isbn: isbn2, isAvailable: true },
      ].map((b) => new Book(b.title, b.author, b.isbn, b.isAvailable));
      members = [
        new Librarian(1, "Librarian Name 1", []),
        new Member(2, "Member Name 2", []),
      ];
      lib = HistoryLibrary.createLibrary(books, members);
    });

    it("returns a book if it exists", () => {
      const result1 = lib.findBook(isbn1);
      const result2 = lib.findBook(isbn2);
      expect(result1).toBeDefined();
      expect(result2).toBeDefined();
    });
    
    it("returns undefined if the book does not exist", () => {
      const result = lib.findBook("unknown_isbn");
      expect(result).toBeUndefined();
    });
  });

  describe("registerMember", () => {
    let books: Book[];
    let members: Member[];
    let lib: HistoryLibrary;

    beforeEach(() => {
      books = [...bookData];
      members = [...memberData];
      lib = HistoryLibrary.createLibrary(books, members);
    });
  
    it("registers a new member successfully", () => {
      const newMember = new Member(5, "New Member", []);
      const newLibrarian = new Librarian(11, "New Librarian", []);
      lib.registerMember(newMember);
      lib.registerMember(newLibrarian);

      expect(lib.members.length).toBe(4);
      expect(lib.librarians.length).toBe(2);
      
      expect(lib.members).toContain(newMember);
      expect(lib.librarians).toContain(newLibrarian);
    });
  
    it("registers a new librarian successfully", () => {
      const newMember = new Librarian(5, "New Member", []);
      lib.registerMember(newMember);
      expect(lib.librarians.length).toBe(2);
      expect(lib.librarians).toContain(newMember);
    });
  
    it("registers a new non-librarian member successfully", () => {
      const newMember = new Member(5, "New Member", []);
      lib.registerMember(newMember);
      expect(lib.members.length).toBe(4);
      expect(lib.members).toContain(newMember);
    });
  
    it("throws an error if the member is already registered", () => {
      const existingMember = members[1];
      const func = () => {
        lib.registerMember(existingMember);
      }
      expect(func).toThrow(LibraryError);
    });
  
    it("throws an error if the member is already a librarian", () => {
      const existingLibrarian = members[0];
      const func = () => {
        lib.registerMember(existingLibrarian);
      }
      expect(func).toThrow(LibraryError);
    });
  });
});