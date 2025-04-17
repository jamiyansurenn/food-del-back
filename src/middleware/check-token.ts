import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers['authorization']) {
            res.status(401).json({ success: false, msg: "Unauthorization" })
            return;
        }

        const [_, token] = req.headers['authorization'].split(' ')

        if (!process.env.ACCESS_TOKEN_SECRET_KEY) {
            throw new Error("ACCESS_TOKEN_SECRET_KEY is not defined in environment variables");
        }
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        if (typeof decode !== "object" || !("user" in decode) || decode.user.role !== "ADMIN") {
            res.status(401).json({ success: false, msg: "Unauthorization" });
            return
        }
        next();

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(401).json({ sucess: false, msg: errorMessage });
    }
}