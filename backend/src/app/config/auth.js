import jwt from 'jsonwebtoken'

export default {
  jwt_secret: process.env.JWT_SECRET || "QqZRoOB0TrkcKJpz0Md2ZXxkPeHDKdgQ",
  expiresIn: "10h",
  createToken(userId) {
    const { jwt_secret, expiresIn } = this
    return jwt.sign({ id: userId }, jwt_secret, { expiresIn })
  }
}
