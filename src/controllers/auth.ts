import { auth } from 'firebase-admin'
import { User } from '../models/User'
import { sendError, sendResponse } from '../utils'

export const login = async (req: any, res: any) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1]

  if (!idToken) {
    return sendError({
      res,
      statusCode: 401,
      message: 'Token no encontrado',
    })
  }

  try {
    await auth().verifyIdToken(idToken)
  } catch (error) {
    return sendError({
      res,
      statusCode: 401,
      message: 'Token invalido',
    })
  }

  const expiresIn = 60 * 60 * 24 * 14 * 1000
  const sessionCookie = await auth().createSessionCookie(idToken, {
    expiresIn,
  })

  res.cookie('__session', sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })

  sendResponse({
    res,
    data: {
      message: 'Inicio de sesión exitoso',
    },
    statusCode: 200,
  })
}

export const register = async (req: any, res: any) => {
  const { name, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })

    if (userExists) {
      return sendError({
        res,
        statusCode: 400,
        message: 'El correo ya está registrado',
      })
    }

    const user = await User.create({
      name,
      email,
      password,
    })

    sendResponse({
      res,
      data: user,
      statusCode: 201,
    })
  } catch (error) {
    sendError({
      res,
      statusCode: 500,
      message: 'Error al crear el usuario',
    })
  }
}
