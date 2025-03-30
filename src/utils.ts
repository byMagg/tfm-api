import jwt from 'jsonwebtoken'

export function sendResponse({
  res,
  statusCode = 200,
  data,
  totalPages,
  total,
  page,
}: {
  res: any
  statusCode?: number
  data: any
  totalPages?: number
  page?: number
  total?: number
}) {
  res.status(statusCode).json({
    data,
    totalPages,
    page,
    total,
  })
}

export function sendError({
  res,
  statusCode = 500,
  message = 'Internal server error',
}: {
  res: any
  statusCode?: number
  message?: string
}) {
  res.status(statusCode).json({
    message,
  })
}

export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '7d' })
}
