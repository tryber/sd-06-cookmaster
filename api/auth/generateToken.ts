import jwt from 'jsonwebtoken'
import { config as dotenvConfig } from 'dotenv' 

export const generateToken = (payload) => {
  dotenvConfig()

  const jwtConfig = {
    expiresIn: process.env.JWT_EXPIRES,
    algorithm: process.env.JWT_ALG
  };
  
  const secret = process.env.JWT_SECRET
  
  const token = jwt.sign({ data: payload }, secret, jwtConfig)

  return token;
};