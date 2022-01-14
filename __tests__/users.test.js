require("../test.init");
const request = require("supertest");
const app = require("../app");

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
