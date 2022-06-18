const articleRouter = require("../routes/articleRoute");
const Article = require("./../models/articleModel");
const request = require("supertest");
const expect = require("expect");
const db = require("../db/connection.js");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("article", articleRouter);

let dummyArticle = {
  title: "devOps",
  body: "My target is to design elegant contents",
};

beforeEach(async function (done) {
  try {
    let result = await Article.remove({});
    User.insertMany(dummyArticle);
  } catch (err) {
    return done(err);
  }
});

// ________________Article Route___________________
describe("Get /article/", function (done) {
  it("return all existing article ", function (done) {
    request(app)
      .get("/article")
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

describe("Post /article/", function () {
  it("Create new article ", function (done) {
    request(app)
      .post("/article/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("Get article/:id", () => {
  it("get article by ID", (done) => {
    request(app)
      .get("/article/:id")
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("Delete article/:id", () => {
  it("Delete target article by ID", (done) => {
    request(app)
      .delete("/article/:id")
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("Put article/:id", () => {
  it("update article by ID", (done) => {
    request(app)
      .put("/article/:id")

      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
