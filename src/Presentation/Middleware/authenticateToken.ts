import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const basicAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers['x-ai-token']) {
    return res.status(401).json({ message: 'Missing X-AI-Token Header' });
  }
  const token = req.headers['x-ai-token'] as string;
  console.log({ token })
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as {
      userId: number;
      email: string;
    };
    req.body.user = { id: decoded.userId, email: decoded.email };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
