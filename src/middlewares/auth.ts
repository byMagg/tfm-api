import { NextFunction } from 'express'
import { getAuth } from 'firebase-admin/auth'
import { sendError } from '../utils'

const protect = async (req: any, res: any, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')[1]

  if (!token) {
    return sendError({
      res,
      statusCode: 401,
      message: 'No autorizado, no hay token',
    })
  }

  try {
    const decoded = await getAuth().verifySessionCookie(token, true)

    if (!decoded) {
      return sendError({
        res,
        statusCode: 401,
        message: 'No autorizado, token no válido',
      })
    }
    next()
  } catch (error) {
    console.log(error)
    sendError({
      res,
      statusCode: 401,
      message: 'No autorizado, token no válido',
    })
  }
}

export { protect }
