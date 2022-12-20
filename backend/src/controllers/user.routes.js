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
      const findUser = await UserValidator.checkById(id)
      return res.status(200).json({ user: findUser })

    } catch (err) {
      throw err
    }
  }
)

UserRouter.get(
  "/:id/friends",
  verifyToken,
  verifyObjectId,
  async (req, res) => {
    const { params } = req
    const { id } = params

    try {
      const findUser = await UserValidator.checkById(id)
      const userFriends = await Promise.all(
        findUser.friends.map(async (friendId) => {
          const findFriend = await UserValidator.checkById(friendId)
          return findFriend
            ? {
              _id: findFriend._id,
              firstName: findFriend.firstName,
              lastName: findFriend.lastName,
              occupation: findFriend.occupation,
              location: findFriend.location,
              picturePath: findFriend.picturePath
            }
            : null
        })
      )
      return res.status(200).json({ friends: userFriends })

    } catch (err) {
      throw err
    }
  }
)

UserRouter.patch(
  "/:id/friends/:friendId",
  verifyToken,
  verifyObjectId,
  async (req, res) => {
    const { params } = req
    const { id, friendId } = params

    try {
      await UserValidator.checkFriend(id, friendId)
      return res.status(200).json({ message: "success" })

    } catch (err) {
      throw err
    }
  }
)

export default UserRouter
