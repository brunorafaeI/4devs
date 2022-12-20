import path from 'path'
import { fileURLToPath } from 'url'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

export class AppError extends Error {
  constructor(message, statusCode = 400) {
    super()
    this.message = message
    this.statusCode = statusCode
  }
}

export const globalError = (err, req, res, next) => {
  const { message, statusCode } = err

  if (err instanceof AppError) {
    return res.status(statusCode).json({ message })
  }

  return res.status(500).json({ message })
}
