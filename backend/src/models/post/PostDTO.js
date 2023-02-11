export class PostDTO {
  constructor ({
    _id,
    description,
    picturePath,
    location,
    userId,
    likes,
    comments,
    createAt,
    updateAt,
    __v
  }) {
    this._id = _id
    this.description = description
    this.picturePath = picturePath
    this.location = location
    this.userId = userId
    this.likes = likes
    this.comments = comments
    this.createAt = createAt
    this.updateAt = updateAt
    this.__v = __v
  }
}

export default PostDTO
