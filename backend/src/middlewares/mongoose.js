import { Types } from 'mongoose'
import { AppError } from '../app/config/global.js'

export const verifyObjectId = async (req, res, next) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    throw new AppError("User id is not valid!", 400)
  }
  next()
}
