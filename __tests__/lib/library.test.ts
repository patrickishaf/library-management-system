import {HistoryLibrary, Member, MemberError} from "../../src/lib";
import {bookData, memberData} from "./dummydata";

describe("library", () => {
  describe("lendBook", () => {
    it("lends a book if the lendee is a member of the library", () => {
      const lib = HistoryLibrary.createLibrary([...bookData], []);
      const member = new Member(1, "Unregistered Member Name", []);
      lib.registerMember(member);
      lib.lendBook(lib.books[0], member);

      expect(lib.books[0].isAvailable).toBe(false);
      expect(member.borrowedBooks).toContain(lib.books[0]);
    });
    it("throws a MemberError if the lendee is not a member of the library", () => {
      const lib = HistoryLibrary.createLibrary([...bookData], []);
      const member = new Member(1, "Unregistered Member Name", []);

      const func = () => {
        lib.lendBook(lib.books[0], member);
      }

      expect(func).toThrow(MemberError);
    });
  });
  
  describe("close", () => {
    it("borrows a book if it is available", () => {});
    it("does not borrow a book if it is unavailable", () => {});
  });
});