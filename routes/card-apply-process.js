import { Router } from "express";

import userMiddleware from "./user.js";

const router = Router();

router.get("/card-apply/process", userMiddleware, async (req, res) => {
  // 检查会话中的formSubmitted变量是否为true
  req.session.formSubmitted = true; //部署後請刪掉！！！！！！！！！！！！！！！！
  if (req.session.formSubmitted) {
    res.render("card-apply-process");
  } else {
    // 若为false，则重定向到 /card-apply
    res.redirect("/card-apply");
  }
});

export default router;
