import { PostNotFound } from './exception/PostException.js'
import PostDTO from './PostDTO.js'
import PostModel from './PostSchema.js'

export default {
  async findById(id) {
    const findPost = await PostModel.findById(id)
    if (!findPost) {
      throw new PostNotFound()
    }

    return new PostDTO(findPost)
  },

  async findAll() {
    const posts = await PostModel.find()
    return Array.isArray(posts) && posts.map(post => new PostDTO(post))
  },

  async find(criteria) {
    const posts = await PostModel.find(criteria)
    return posts.map(post => new PostDTO(post))
  },

  async create(objPost) {
    const post = new PostModel(objPost)
    const savePost = await post.save()

    return new PostDTO(savePost)
  },

  async deleteById(id) {
    const post = await PostModel.findByIdAndDelete(id)
    if (!post) {
      throw new PostNotFound()
    }
  },
}
