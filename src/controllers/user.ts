import { User } from '../models/User'
import { sendError, sendResponse } from '../utils'

export const getUsers = async (req: any, res: any) => {
  const { page = '1', limit = '10' } = req.query

  const pageNumber = Number(page) || 1
  const limitNumber = Number(limit) || 10
  const skip = (pageNumber - 1) * limitNumber

  const users = await User.find().skip(skip).limit(limitNumber)
  const totalUsers = await User.countDocuments()

  sendResponse({
    res,
    data: users,
    totalPages: Math.ceil(users.length / limitNumber),
    total: totalUsers,
    page: pageNumber,
  })
}

export const getUsersByIds = async (req: any, res: any) => {
  const { ids } = req.body

  if (!ids || !Array.isArray(ids)) {
    return sendError({
      res,
      statusCode: 400,
      message: 'Debes enviar un array de ids',
    })
  }

  const users = await User.find({ _id: { $in: ids } })

  sendResponse({
    res,
    data: users,
  })
}

export const createUser = async (req: any, res: any) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return sendError({
      res,
      statusCode: 400,
      message: 'Debes enviar un name, email y password',
    })
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    return sendError({
      res,
      statusCode: 400,
      message: 'Ya existe un usuario con ese email',
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
  })
}
