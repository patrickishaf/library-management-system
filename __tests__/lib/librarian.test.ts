import {Book, Librarian, LibrarianError, Library, LibraryError, ScienceLibrary} from "../../src/lib";
import {bookData, memberData} from "./dummydata";
import {v4 as uuid} from "uuid";

describe("addBook", () => {
  it("adds a book if the same book doesn't exist in the library", () => {
    const lib = ScienceLibrary.createLibrary([...bookData], [...memberData]);
    lib.open();
    const librarian = new Librarian(10, "New Name", []);
    lib.registerMember(librarian);

    const newBook = new Book("New Title", "New Author", uuid(), true);
    librarian.addBook(newBook);

    expect(lib.size).toBe(bookData.length + 1);
  });

  it("throws a LibrarianError if the value of library is not set", () => {const lib = ScienceLibrary.createLibrary([...bookData], [...memberData]);
    const librarian = new Librarian(10, "New Name", []);

    const newBook = new Book("New Title", "New Author", uuid(), true);
    const func = () => {
      librarian.addBook(newBook);
    }

    expect(func).toThrow(LibrarianError);
  });

  it("takes a book without increasing the number of books if it exists in the library", () => {
    const lib = ScienceLibrary.createLibrary([...bookData], [...memberData]);
    const librarian = new Librarian(10, "New Name", []);
    lib.registerMember(librarian);

    const isbn = uuid();
    const newBook = new Book("New Title", "New Author", isbn, true);

    lib.open();
    librarian.addBook(newBook);
    librarian.addBook(newBook);

    expect(lib.size).toBe(bookData.length + 1);
  });
});

describe("removeBook", () => {
  it("removes a book if it exists in the library", () => {});
  it("throws a LibrarianError if the value of library is not set", () => {});
  it("does not remove a book if it does not exist", () => {});
});

describe("joinLibrary", () => {
  it("sets the value of the librarian's library successfully", () => {});
});