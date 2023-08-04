import { Router } from "express";

import userMiddleware from "./user.js";

import fs from "fs";

const router = Router();

router.get("/card-apply", userMiddleware, async (req, res) => {
  fs.readFile("./data/json/cards.json", "utf8", (err, data) => {
    if (err) {
      console.error("讀取檔案時發生錯誤：", err);
      return res.status(500).send("Internal Server Error");
    }
    const cardsData = JSON.parse(data);

    res.render("card-apply", { cardsData });
  });
  req.session.formSubmitted = false;
});

router.post("/card-apply", async (req, res) => {
  req.session.formSubmitted = true;
  res.redirect("/card-apply/process");
});

export default router;
