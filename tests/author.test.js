const request = require("supertest");
const app = require("../index.js");

jest.setTimeout(20000);

test("Create new author", async () => {
  await request(app)
    .post("/author")
    .send({ name: "joe", jobTitle: "devOps", email: "joe@gmail.com" })
    .expect(201);
});
test("Read Authors ", async () => {
  await request(app)
    .get("/author")
    // .send({ name: "joe", jobTitle: "devOps", email: "joe@gmail.com" })
    .expect(200);
});
