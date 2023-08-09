import { Router } from "express";

import userMiddleware from "./user.js";

import fs from "fs";

const router = Router();

router.get("/card-apply/process", userMiddleware, async (req, res) => {
  // 检查会话中的formSubmitted变量是否为true
  req.session.formSubmitted = true; //部署後請刪掉！！！！！！！！！！！！！！！！
  if (req.session.formSubmitted) {
    fs.readFile("./data/json/taiwanBankCode.json", "utf8", (err, data) => {
      if (err) {
        console.error("讀取檔案時發生錯誤：", err);
        return res.status(500).send("Internal Server Error");
      }
      const Code = JSON.parse(data);
      fs.readFile("./data/json/options.json", "utf8", (err2, data2) => {
        if (err2) {
          console.error("讀取檔案 options 時發生錯誤：", err2);
          return res.status(500).send("Internal Server Error");
        }
        const optionsData = JSON.parse(data2);
        // 傳遞到渲染函數中
        res.render("card-apply-process", { Code, optionsData });
      });
    });
  } else {
    // 若为false，则重定向到 /card-apply
    res.redirect("/card-apply");
  }
});

export default router;
