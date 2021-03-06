const AuthorRouter = require("../routes/authorRoute");
const Author = require("./../models/authorModel.js");
const request = require("supertest");
const expect = require("expect");
const db = require("../db/connection.js");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("author", AuthorRouter);

let dummyAuthor = [
  {
    name: "ali",
    jobTitle: "devOps",
    email: "ali@gmail.com",
  },
];

beforeEach(async function (done) {
  try {
    let result = await Author.remove({});
    User.insertMany(dummyAuthor);
  } catch (err) {
    return done(err);
  }
});
// ________________Author Route___________________
describe("Get /author/", function (done) {
  it("return all existing authors ", function (done) {
    request(app)
      .get("/author")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      // .expect((res)=>{
      //     expect(res.body()).toContain()
      // })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  }).timeout(20000);
});

describe("Post /author/", function () {
  it("Create new Author ", function (done) {
    request(app)
      .post("/author")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("Get author/:id", () => {
  it("get Author by ID", (done) => {
    request(app)
      .get("/author/:id")
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("Delete author/:id", () => {
  it("Delete target author by ID", (done) => {
    request(app)
      .delete("/author/:id")
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("Put author/:id", () => {
  it("update author by ID", (done) => {
    request(app)
      .put("/author/:id")

      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
