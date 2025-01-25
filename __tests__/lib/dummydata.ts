import {v4 as uuid} from "uuid";
import {Book, Librarian, Member} from "../../src/lib";

export const bookData = [
  {title: "Title 0", author: "Author", isbn: uuid(), isAvailable: true },
  {title: "Title 1", author: "Author", isbn: uuid(), isAvailable: true },
  {title: "Title 2", author: "Author", isbn: uuid(), isAvailable: true },
  {title: "Title 3", author: "Author", isbn: uuid(), isAvailable: true },
  {title: "Title 4", author: "Author", isbn: uuid(), isAvailable: true },
  {title: "Title 5", author: "Author", isbn: uuid(), isAvailable: true },
  {title: "Title 6", author: "Author", isbn: uuid(), isAvailable: true },
].map((b) => new Book(b.title, b.author, b.isbn, b.isAvailable));

export const memberData = [
  new Librarian(1, "Librarian Name 1", []),
  new Member(2, "Member Name 2", []),
  new Member(3, "Member Name 3", []),
  new Member(4, "Member Name 4", []),
];