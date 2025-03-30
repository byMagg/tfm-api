import { NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../models/User'
import { sendError } from '../utils'

const protect = async (req: any, res: any, next: NextFunction) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload
      if (typeof decoded === 'object' && decoded.id) {
        req.user = await User.findById(decoded.id).select('-password')
      } else {
        return res.status(401).json({ message: 'Token inválido' })
      }
      next()
    } catch (error) {
      sendError({
        res,
        statusCode: 401,
        message: 'No autorizado, token no válido',
      })
    }
  }

  if (!token) {
    sendError({
      res,
      statusCode: 401,
      message: 'No autorizado, no hay token',
    })
  }
}

export { protect }
