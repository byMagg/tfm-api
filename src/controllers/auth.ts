import { User } from '../models/User'
import { generateToken, sendError, sendResponse } from '../utils'

export const login = async (req: any, res: any) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user || !(await user.matchPassword(password))) {
      return sendError({
        res,
        statusCode: 401,
        message: 'Credenciales incorrectas',
      })
    }

    const token = generateToken(user.id)

    res.cookie('__session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    })

    sendResponse({
      res,
      data: {
        ...user.toJSON(),
        token: token,
      },
      statusCode: 200,
    })
  } catch (error) {
    sendError({
      res,
      statusCode: 500,
      message: 'Error al iniciar sesión',
    })
  }
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
