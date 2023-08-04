import { Request, Response, NextFunction } from 'express'
import Jwt from 'jsonwebtoken'
import { jwtInfo } from '../types/infoJWT'
import User from '../models/User'

const validateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers['authorization']
    if (!token) {
      throw 401
    }
    if (token) {
      token = token.split(' ')[1]
      let data = Jwt.verify(token, process.env.ACCESS_SECRET_KEY as string) as jwtInfo
      let user = await User.findOne({ email: data.email })
      if (!user) {
        throw 'Unauthorized'
      }

      req.user = {
        _id: user?._id,
        email: user?.email
      }
    }
    return next()
  } catch (error) {
    // console.log(error)
    return res.status(401).send({ message: 'Unauthorized' })
  }
}

export default validateAccessToken
