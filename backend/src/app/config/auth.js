import jwt from 'jsonwebtoken'

export default {
  jwtSecret: process.env.JWT_SECRET || 'QqZRoOB0TrkcKJpz0Md2ZXxkPeHDKdgQ',
  expiresIn: '10h',
  createToken (userId) {
    const { jwtSecret, expiresIn } = this
    return jwt.sign({ id: userId }, jwtSecret, { expiresIn })
  }
}
