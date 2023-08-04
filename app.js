import express from "express";
import "dotenv/config";

const HTTP_PORT = process.env.HTTP_PORT || 10000;
const app = express();

// globle variable
process.env.SESSION_MAX_AGE = 60 * 60 * 24 * 5 * 1000;

// static folder
app.use("/", express.static("public"));

// body parser
import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cookie parser
import cookieParser from "cookie-parser";
app.use(cookieParser());

// view engine
import nunjucks from "nunjucks";
nunjucks.configure("views", {
  autoescape: true,
  cache: false,
  express: app,
});

app.set("views", "./views");
app.set("view engine", "njk");
app.engine("njk", nunjucks.render);

// session
import session from "express-session";
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: Number(process.env.SESSION_MAX_AGE), httpOnly: true },
  })
);

// router
import index from "./routes/index.js";
import cardApply from "./routes/card-apply.js";
import getChatGPT from "./routes/getChatGPT.js";
import cardApplyProcess from "./routes/card-apply-process.js";
import user from "./routes/user.js";

app.use(index);
app.use(cardApply);
app.use(getChatGPT);
app.use(cardApplyProcess);
app.use(user);

// error handler
app.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);

  // handle CSRF token errors here
  res.status(403);
  res.send("form tampered with");
});

import mongoose from "mongoose";

// MongoDB Connection
mongoose.connect(process.env.MONGO_API, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// listen
app.listen(HTTP_PORT, () => {
  console.log(`> Listening on port ${HTTP_PORT}`);
});
