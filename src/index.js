const express = require("express"); //express
const morgan = require("morgan"); // HTTP request logger middleware
const helmet = require("helmet"); // Help secure Express/Connect apps with various HTTP headers
require("dotenv").config({ path: __dirname + "/../.env" });

const port = process.env.PORT || 3001;
console.log(`
DB_NAME = ${process.env.DB_NAME},
DB_URI = ${process.env.DB_URI},
PORT = ${process.env.PORT},
BCRYPT_SECRET_KEY = ${process.env.BCRYPT_SECRET_KEY}
`);

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.get("/", (req, res, next) => {
  try {
    throw new Error("THIS IS JUST A TEST ERROR");
    res.json({
      success: "true",
      message: `Welcome to API`,
      data: {},
    });
  } catch (error) {
    next(error);
  }
});

app.use(function (req, res, next) {
  res.status(404).send(`404 NOT FOUND, INVALID URL > ${req.originalUrl}`);
});

//Error
app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  const stack = process.env.NODE_ENV === "production" ? error.stack : "🌌";
  res.json({
    message: error.message,
    stack,
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
