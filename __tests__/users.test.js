require("../test.init");
const request = require("supertest");
const app = require("../app");
const { describe } = require("../src/db/models/base");

// Test criteria
// Test Scenarios
// ==============================
// 1 - Admin Routes
// 2 - Normal Routes
// 3 - Public Routes
// 4 - Valid Admin Token
// 5 - Valid Normal Token
// 6 - Invalid Admin Token
// 7 - Invalid Normal Token
// 8 - Missing token
// 9 - Valid Entries
// 10 - Invalid Entries


describe("================= USERS - AUTHENTICATED =================", () => {
  describe("POSITIVE TESTS", () => {
    it("search users", async () => {
      const res = await request(app)
        .post("/api/users/search")
        .set("Authorization", __TOKEN_ADMIN);
      expect(res.statusCode).toEqual(200);
    });

    it("create user", async () => {});

    it("search user with name Test", async () => {});

    it("get user by code", async () => {});

    it("update user by code", async () => {});

    it("delete users by code", async () => {});

    it("get user profile", async () => {});
  });

  describe("NEGATIVE TESTS", () => {
    it("search users", async () => {
      const res = await request(app)
        .post("/api/users/search")
        .set("Authorization", __TOKEN_ADMIN);
      expect(res.statusCode).toEqual(200);
    });

    it("create user", async () => {});

    it("search user with name Test", async () => {});

    it("get user by code", async () => {});

    it("update user by code", async () => {});

    it("delete users by code", async () => {});

    it("get user profile", async () => {});
  });
});