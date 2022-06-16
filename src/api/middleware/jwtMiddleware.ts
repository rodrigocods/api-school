import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

enum UserType {
  "teacher",
  "student"
}

class jwtMiddleware {
  verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No jwt provided.' });

    verify(token.toString(), process.env.SECRET, (err, decoded) => {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate jwt.' });

      next();
    });
  }
}

export default new jwtMiddleware();