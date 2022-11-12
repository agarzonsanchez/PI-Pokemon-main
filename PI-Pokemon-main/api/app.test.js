var assert = require("assert");
const { expect } = require("chai");
const { pokemonDB } = require("../api/src/controllers/pokemonContoller");
describe("Basic test", () => {
  describe("Practice", () => {
    it("practice", () => {
      var result = 5 * 3;
      assert.equal(result, 15);
    });

    it("apiDB function should return an array", async () => {
      const result = await pokemonDB();
      expect(result).to.be.an("array");
    });
  });
});
