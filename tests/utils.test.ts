import { expect } from "chai";
import getAllPosts from "../utils/getAllPosts";

// TODO implement test
describe("Testing utils functions", () => {
  describe("Testing the getAllPosts() function", () => {
    it("Expecting an array of all posts that have a date previous to today", async () => {
      const posts = getAllPosts();
      expect(posts).to.eql("369184527286927371");
    });
  });
});
