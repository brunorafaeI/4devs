import { Schema, model } from 'mongoose'

const PostSchema = Schema({
  userId: {
    type: String,
    required: true
  },
  picturePath: {
    type: String,
    default: ''
  },
  location: String,
  description: {
    type: String,
    default: ''
  },
  likes: {
    type: Map,
    of: Boolean
  },
  comments: {
    type: Array,
    default: []
  }
}, { timestamps: true })

export default model('Post', PostSchema)
