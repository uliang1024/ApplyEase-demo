import { Router } from "express";

import userMiddleware from "./user.js";

const router = Router();

router.get("/", userMiddleware, async (req, res) => {
  res.render("index");
});

export default router;
