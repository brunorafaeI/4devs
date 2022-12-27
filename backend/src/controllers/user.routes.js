import { Router } from "express"

import { verifyToken } from "../middlewares/jwt.js"
import { verifyObjectId } from "../middlewares/mongoose.js"
import PostRepository from "../models/post/PostRepository.js"
import UserRepository from "../models/user/UserRepository.js"

const UserRouter = Router()

UserRouter.get(
  "/",
  verifyToken,
  async (req, res) => {

    try {
      const findUsers = await UserRepository.findAll()
      res.status(200).json({ users: findUsers })

    } catch (err) {
      throw err
    }
  }
)

UserRouter.get(
  "/:id",
  verifyToken,
  verifyObjectId,
  async (req, res) => {
    const { params } = req
    const { id } = params

    try {
      const findUser = await UserRepository.findById(id)
      res.status(200).json({ user: findUser })

    } catch (err) {
      throw err
    }
  }
)

UserRouter.patch(
  "/:id",
  verifyToken,
  verifyObjectId,
  async (req, res) => {
    const { params, body } = req
    const { id } = params

    try {
      const updatedUser = await UserRepository.update(id, body)
      res.status(200).json({ user: updatedUser })

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
      const findUser = await UserRepository.findById(id)
      const userFriends = await Promise.all(
        findUser.friends.map(async (friendId) => {
          const findFriend = await UserRepository.findById(friendId)
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
      res.status(200).json({ friends: userFriends })

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
      await UserRepository.updateFriend(id, friendId)
      res.status(200).json({ message: "Friends updated successfully" })

    } catch (err) {
      throw err
    }
  }
)

UserRouter.get(
  "/:id/posts",
  verifyToken,
  verifyObjectId,
  async (req, res) => {
    const { params } = req
    const { id } = params

    try {
        const findPosts = await PostRepository.find({ userId: id })
        res.status(200).json({ posts: findPosts })

    } catch (err) {
        throw err
    }
  }
)

export default UserRouter
