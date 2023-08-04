import Jwt from 'jsonwebtoken'
import { jwtInfo } from 'src/types/infoJWT'

export const generateRefreshToken = (data: jwtInfo) =>
  Jwt.sign(data, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: '1d'
  })
