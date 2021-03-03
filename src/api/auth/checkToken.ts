import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken'
import { getByUserName } from '../models/users'

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await getByUserName(decoded.data.name)

    if (!user) return res.status(401).json({ message: 'Error to find user of token' })
    req.user = user;
    
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' })
  }
}