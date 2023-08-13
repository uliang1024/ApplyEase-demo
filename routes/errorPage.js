import { Router } from "express";

import userMiddleware from "./user.js";

const router = Router();

router.get("/error", userMiddleware, async (req, res) => {
  res.render("error");
});

export default router;
