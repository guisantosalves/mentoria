import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    // decoding and chaging the request
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT as string);
    (req as CustomRequest).token = decodedToken;

    next();
  } catch (e) {
    res.status(401).send("Please Authenticate");
  }
};
