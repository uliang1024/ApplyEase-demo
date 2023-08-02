import { Router } from "express";
import fetch from "node-fetch";

const router = Router();

const allowedModels = ["gpt-3.5-turbo"];

router.post("/getChatGPT", async (req, res) => {
  const { model, messages } = req.body;

  if (!allowedModels.includes(model)) {
    return res.status(400).json({ error: "Invalid model parameter." });
  }

  try {
    const fetchRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.CHATGPT_API_KEY,
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
      }),
    });
    const data = await fetchRes.json();
    res.send(data);
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching data from OpenAI." });
  }
});

export default router;
