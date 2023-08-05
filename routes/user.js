import { Router } from "express";
import { generateNewUserId } from "./helpers.js";
import mongoose from "mongoose";

const router = Router();

// 定義 Message Schema
const messageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const User = mongoose.model(
  "User",
  new mongoose.Schema({
    _id: String,
    messages: [messageSchema],
  })
);

// 处理请求，用于生成和识别用户标识符
router.use(async (req, res, next) => {
  
  const userId = req.cookies.userId;
  if (!userId) {
    // 生成新的用户标识符
    const newUserId = generateNewUserId();
    // 将新的用户标识符设置为Cookie
    res.cookie("userId", newUserId);
    // 存储新用户到数据库
    await User.create({ _id: newUserId });
  } else {
    // 在数据库中查找现有用户
    const user = await User.findOne({ _id: userId });
    if (!user) {
      // 如果数据库中没有此用户，则创建一个新的用户并存储到数据库
      const newUserId = generateNewUserId();
      await User.create({ _id: newUserId });
      res.cookie("userId", newUserId);
    }
  }

  next(); // 继续往下执行其他路由处理函数
});

export default router;
