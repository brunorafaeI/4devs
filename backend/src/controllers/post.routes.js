import { Router } from "express"
import { verifyToken } from "../middlewares/jwt.js"
import PostRepository from "../models/post/PostRepository.js"

const PostRouter = Router()

PostRouter.get(
  "/",
  verifyToken,
  async (req, res) => {

    try {
      const findPosts = await PostRepository.findAll()
      res.status(200).json({ posts: findPosts })

    } catch (err) {
      throw err
    }
  }
)

PostRouter.get(
  "/:id",
  verifyToken,
  async (req, res) => {
    const { params } = req
    const { id } = params

    try {
      const findPost = await PostRepository.findById(id)
      res.status(200).json({ post: findPost })

    } catch (err) {
      throw err
    }
  }
)

PostRouter.post(
  "/",
  verifyToken,
  async (req, res) => {
    const { body } = req

    try {
      const newPost = await PostRepository.create(body)
      res.status(201).json({ post: newPost })

    } catch (err) {
      throw err
    }
  }
)

PostRouter.patch(
  "/:id/linkes",
  verifyToken,
  async (req, res) => {
    const { params, body } = req
    const { id } = params
    const { userId } = body

    try {
      const findPost = await PostRepository.findById(id)
      findPost.likes.set(userId, !findPost.likes.get(userId))

      const savePost = await findPost.save()
      res.status(200).json({ post: savePost })

    } catch (err) {
      throw err
    }
  }
)

PostRouter.delete(
  "/:id",
  verifyToken,
  async (req, res) => {
    const { params } = req
    const { id } = params

    try {
      await PostRepository.deleteById(id)
      res.status(204).json({ message: "Post deleted successfully" })

    } catch (err) {
      throw err
    }
  }
)

export default PostRouter
