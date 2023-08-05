import { Router } from "express";
import mongoose from "mongoose";
import { User } from "./user.js";

const router = Router();

router.post("/sendMessage", async (req, res) => {
  const userId = req.cookies.userId;
  const userMessage = req.body.message;

  try {
    let user = await User.findOne({ _id: userId });
    if (!user) {
      user = new User({
        _id: userId,
      });
    }

    const messageDocument = {
      _id: new mongoose.Types.ObjectId(),
      text: userMessage,
      timestamp: Date.now(),
    };

    user.messages.push(messageDocument);
    await user.save();
    console.log("Message saved to database:", messageDocument);
  } catch (error) {
    console.error("Error saving message to database:", error);
  }
});

export default router;
