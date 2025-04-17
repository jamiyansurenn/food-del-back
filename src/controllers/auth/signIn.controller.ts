
import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const signIn = async (req: Request, res: Response) => {
  const ACCESS_TOKEN_SECRET_KEY = "jamya123"
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(401).json({ message: "emailaa oruulna uu" });
      return;
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json({ message: "email bvrtgelgvi baina" });
      return;
    }

    const isCorrect = bcrypt.compareSync(password, user?.password);

    if (!isCorrect) {
      res.status(401).json({ message: "password buruu bna" });
      return;
    }
    const token = jwt.sign({ user }, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1h' });
    console.log(token, "this is token");
    res.status(200).json({ success: true, token })
    // res.status(200).json({ message: "amjilttai newterlee", data: user });
  } catch (error) {
    res.status(500).json({ message: "aldaa garlaa", error });
  }

};