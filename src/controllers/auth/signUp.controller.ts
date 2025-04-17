import { hashSync } from "bcryptjs";
import { User } from "../../models/user.model";
import { Request, RequestHandler, Response } from "express";

export  const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(401).json({ message: "Emailaa bichne vvv" });
      return;
    }
    const hashedPassword = hashSync(password, 10);
    const createUser = await User.create({
      email,
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ message: "hereglegch amjilttai bvrtgelee", data: createUser });
  } catch (error) {
    res.status(500).json({ message: "aldaa garlaa", error });
  }
};

export  const getUsers: RequestHandler = async (req, res) => {
  try {
    const AllUsers = await User.find();
    res.status(200).json({ message: "success get category", data: AllUsers });
  } catch (error) {
    res.status(500).json({ message: "Error in getCategories", error });
  }
};
