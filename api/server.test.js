const model = require("./auth/auth-model");
const request = require("supertest");
const server = require("./server");
const db = require("./../data/dbConfig");
const bcrypt = require("bcryptjs");

// Write your tests here
test("sanity", () => {
  expect(true).toBe(true);
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

describe("testing regiser endpoint", () => {
  test("creates a account", async () => {
    let result = await request(server)
      .post("/api/auth/register")
      .send({ username: "william", password: "1234" });
    expect(result.body.username).toBe("william");
    expect(result.body.id).toEqual(1);
  });
  test("creates and saves a bcrypted password instead of plain text", async () => {
    let result = await request(server)
      .post("/api/auth/register")
      .send({ username: "jerry", password: "1234" });
    const user = await db("users").where("username", "jerry").first();
    expect(bcrypt.compareSync("1234", user.password)).toBeTruthy();
  });
});

describe("testing login endpoint", () => {
  test("your able to login and it whos the correct message", async () => {
    let result = await request(server)
      .post("/api/auth/login")
      .send({ username: "jerry", password: "1234" });
    expect(result.body.message).toBe("welcome, jerry");
  });

  test("sends a correct error message if its an incorrect username or password", async () => {
    let result = await request(server)
      .post("/api/auth/login")
      .send({ username: "jer", password: "1234" });
    expect(result.body.message).toBe("invalid credentials");
    result = await request(server)
      .post("/api/auth/login")
      .send({ username: "jerry", password: "12343434" });
    expect(result.body.message).toBe("invalid credentials");
  });
});
