import { Router } from "express";
import fetch from "node-fetch";

const router = Router();

router.post("/witai", async (req, res) => {
  const userMessage = req.body.userMessage; // 從前端接收使用者輸入

  const witaiToken = process.env.WITAI_TOKEN; // Wit.ai 授權令牌
  const query = encodeURIComponent(userMessage);
  const url = `https://api.wit.ai/message?v=20230814&q=${query}`;
  const headers = {
    Authorization: `Bearer ${witaiToken}`,
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    res.json(data); // 回傳 Wit.ai 的回應
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

export default router;