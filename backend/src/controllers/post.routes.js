import { Router } from 'express'
import { verifyToken } from '../middlewares/jwt.js'
import PostRepository from '../models/post/PostRepository.js'

const PostRouter = Router()

PostRouter.get(
  '/',
  verifyToken,
  async (req, res) => {
    const findPosts = await PostRepository.findAll()
    res.status(200).json({ posts: findPosts })
  }
)

PostRouter.get(
  '/:id',
  verifyToken,
  async (req, res) => {
    const { params } = req
    const { id } = params

    const findPost = await PostRepository.findById(id)
    res.status(200).json({ post: findPost })
  }
)

PostRouter.post(
  '/',
  verifyToken,
  async (req, res) => {
    const { body } = req

    const newPost = await PostRepository.create(body)
    res.status(201).json({ post: newPost })
  }
)

PostRouter.patch(
  '/:id/linkes',
  verifyToken,
  async (req, res) => {
    const { params, body } = req
    const { id } = params
    const { userId } = body

    const findPost = await PostRepository.findById(id)
    findPost.likes.set(userId, !findPost.likes.get(userId))

    const savePost = await findPost.save()
    res.status(200).json({ post: savePost })
  }
)

PostRouter.delete(
  '/:id',
  verifyToken,
  async (req, res) => {
    const { params } = req
    const { id } = params

    await PostRepository.deleteById(id)
    res.status(204).json({ message: 'Post deleted successfully' })
  }
)

export default PostRouter
