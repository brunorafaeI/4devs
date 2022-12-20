import { Router } from "express"

import { verifyToken } from "../middlewares/jwt.js"
import { verifyObjectId } from "../middlewares/mongoose.js"
import UserValidator from "../models/user/validator/UserValidator.js"

const UserRouter = Router()

UserRouter.get(
  "/:id",
  verifyToken,
  verifyObjectId,
  async (req, res) => {
    const { params } = req
    const { id } = params

    try {
      const findUser = await UserValidator.checkId(id)
      return res.status(200).json({ user: findUser })

    } catch (err) {
      throw err
    }
  }
)

export default UserRouter
