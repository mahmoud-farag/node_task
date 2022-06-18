const express = require("express");
const articleRouter = require("./routes/articleRoute.js");
const authorRouter = require("./routes/authorRoute.js");
const { connectDB } = require("./db/connection.js");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const app = express();

app.use(express.json());

// sawgger docs
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<h1>Hello, your API is ready for the Fire Works online</h1> <a href="/api-docs">DOCUMENTATION</a> '
    );
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(require("./routes/auth.js"));
app.use("/article", articleRouter);

app.use("/author", authorRouter);

app.use("*", (req, res) => {
  res.status(404).send("This page not found");
});

// app security modules
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

const connect = async () => {
  try {
    if (process.env.NODE_ENV === "dev" || "production") {
      await connectDB(process.env.MONGODB_URL);
    }
    if (process.env.NODE_ENV === "text") {
      await connectDB(process.env.MONGODB_URL_TEST);
    }
  } catch (err) {
    console.log(err);
  }
};

connect();
// we need to export express app without calling listen function in every calling to the app object
module.exports = app;
