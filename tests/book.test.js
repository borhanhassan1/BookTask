const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app.js");
const User = require("../models/User");
const { MongoMemoryReplSet } = require("mongodb-memory-server");

let replSet;
let token;
let bookId;

beforeAll(async () => {
   replSet = await MongoMemoryReplSet.create({
    replSet: { storageEngine: "wiredTiger" },
  });
  const uri = replSet.getUri();
  await mongoose.connect(uri);
  await User.create({
    name: "Borhan",
    email: "gabrborhan@gmail.com",
    age: 30,
    password: "$2b$10$wHldSW3IcVXw5xjYjbaPFutlSXFbTNgsMEEHCj/cF.LauAziw1w4S",
  });

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "gabrborhan@gmail.com",
    password: "Bor12345",
  });
  token = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await replSet.stop();
});

describe("Book API", () => {
  test("Should create a new book", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "The Testing Book",
        description: "John Doe writes about testing.",
        amount: 20,
        isbn: "123-4567890123",
      });
    expect(res.statusCode).toBe(201);
    bookId = res.body.book._id;
  });

  test(" Should get all books", async () => {
    const res = await request(app)
      .get("/api/books")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
test(" Should get a book by ID", async () => {
  const res = await request(app)
    .get(`/api/books/${bookId}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body._id).toBe(bookId);
});

test("Should update a book", async () => {
  const res = await request(app)
    .put(`/api/books/${bookId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "Updated Title" });

  expect(res.statusCode).toBe(200);
  expect(res.body.title).toBe("Updated Title");
});

test("Should buy a book", async () => {
  const res = await request(app)
    .post(`/api/books/buy/${bookId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
});

  test("Should delete a book", async () => {
    const res = await request(app)
      .delete(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

