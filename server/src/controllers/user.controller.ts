import { Request, Response } from 'express'
import prisma from '../lib/prisma'
import { comparePasswords, generateToken } from '../modules/auth'

const login = async (req: Request, res: Response) => {
  const { name, password } = req.body

  if (!req.body.name && !req.body.password) {
    return res.status(401).send({ msg: 'Username and password are required' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        name,
      },
    })
     
    if(!user){
        return res.status(400).send({ msg: 'Invalid username' })
    }

    console.log(user)
    if (
      !(await comparePasswords(
        password,
        user?.password as 'string | undefined'
      ))
    )
      res.status(403).send({ msg: 'Passwords do not match' })

    const token = generateToken(user)

    res.status(200).send({ token })
  } catch (error) {
    res.status(400).end()
  }
}

export default login
