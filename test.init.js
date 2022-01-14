const request = require("supertest");
const app = require("./app");
require("events").EventEmitter.defaultMaxListeners = Infinity;

global.__TOKEN_ADMIN = undefined;

// AUTHENTICATION
beforeAll((done) => {
  // USER: ADMIN
  request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@volkskreisuae.com",
      password: "password",
    })
    .end((err, response) => {
      __TOKEN_ADMIN = `Bearer ${response.body.token}`; // save the token!
      done();
    });
});

afterAll(async () => {
  __TOKEN_ADMIN = undefined;
  await new Promise((resolve) => setTimeout(() => resolve(), 1000)); // avoid jest open handle error
});