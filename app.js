import express from "express";
import "dotenv/config";

const HTTP_PORT = process.env.HTTP_PORT || 8080;
const app = express();

// static folder
app.use("/", express.static("public"));

// body parser
import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// router
import index from "./routes/index.js";
import cardApply from "./routes/card-apply.js";
import getChatGPT from "./routes/getChatGPT.js";

app.use(index);
app.use(cardApply);
app.use(getChatGPT);

// error handler
app.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);

  // handle CSRF token errors here
  res.status(403);
  res.send("form tampered with");
});

// listen
app.listen(HTTP_PORT, () => {
  console.log(`> Listening on port ${HTTP_PORT}`);
});
