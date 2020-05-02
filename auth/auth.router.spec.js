const request = require("supertest");
const server = require("../api/server.js");

describe("server", () => {
  it("testing environment should be set", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
  describe("testing the registering functionality", () => {
    it("testing that a user gets the right status code when registering", async () => {
      const name = Math.random().toString();
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: name, password: "tests4real" });
      expect(res.status).toBe(200);
    });
    it("testing that a user gets saved correctly", async () => {
      const names = Math.random().toString();
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: names, password: "testttt" });
      expect(res.body.message).toBe("You're registered!");
    });
  });
  describe("login functionality", () => {
    it("user gets the status code when logging in", async () => {
      const res = await request(server).post("/api/auth/login").send({
        username: "catman12",
        password: "password",
      });
      expect(res.status).toBe(200);
    });
    it("user gets the status code when failing logging in", async () => {
      const res = await request(server).post("/api/auth/login").send({
        username: "catman12",
        password: "password2",
      });
      expect(res.status).toBe(401);
      expect(res.body.errorMessage).toBe("Your credentials were invalid!");
    });
  });
  describe("getting our users", () => {
    it("user gets a list of users", async () => {
      const res = await request(server)
        .get("/api/auth/userlist")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJjYXRtYW4xMiIsImlhdCI6MTU4ODM4NTg0MiwiZXhwIjoxNTg4NDcyMjQyfQ.P2ILJCWm_loud1pdsoKlfOAJyJWX2kQ2bsj_PqrM_Gk"
        );
      expect(res.body.length).toBeGreaterThan(0);
    });
    it("user gets a list of users", async () => {
      const res = await request(server)
        .get("/api/auth/userlist")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJjYXRtYW4xMiIsImlhdCI6MTU4ODM4NTg0MiwiZXhwIjoxNTg4NDcyMjQyfQ.P2ILJCWm_loud1pdsoKlfOAJyJWX2kQ2bsj_PqrM_Gk"
        );
      expect(res.status).toBe(201);
    });
  });
});
