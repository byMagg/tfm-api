import { NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../models/User'
import { sendError } from '../utils'

const protect = async (req: any, res: any, next: NextFunction) => {
  let token

  if (req.cookies.__session) {
    token = req.cookies.__session
  } else if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return sendError({
      res,
      statusCode: 401,
      message: 'No autorizado, no hay token',
    })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload
    if (typeof decoded === 'object' && decoded.id) {
      req.user = await User.findById(decoded.id).select('-password')
    } else {
      return sendError({
        res,
        statusCode: 401,
        message: 'No autorizado, token no válido',
      })
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

export { protect }
