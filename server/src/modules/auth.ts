import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';


declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user?: unknown
    }
  }
}


export const comparePasswords = (password: string, hash: string) => {
  return new Promise( (resolve, reject) => {
      bcrypt.compare(password, hash, (err: Error | undefined, same: boolean) => {
        if(err) reject(err)
        resolve(same)
      })
  })
} 

export const generateToken = (payload : any) => {
  const token = jwt.sign({
    id: payload.id,
    name: payload.name
  }, process.env.JWT_SECRET as Secret);
  return token;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  if(!req.headers.authorization) {
    return res.status(401).send({ msg: 'Unauthorized' })
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).send({ msg: 'Unauthorized' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as Secret);

    req.user = payload
    next()
  } catch (error) {
    return res.status(401).send({ msg: 'Unauthorized' })
  }
}

