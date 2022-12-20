import bcrypt from 'bcrypt'

import UserModel from '../UserSchema.js'
import { UserInvalidCredential, UserNotFound } from './excepction/UserException.js'

export default  {
  async checkId(id) {
    const findUser = await UserModel.findOne({ _id: id })
    if (!findUser) {
      throw new UserNotFound("User not found!", 404)
    }
    return findUser
  },

  async checkEmail(email) {
    const findUser = await UserModel.findOne({ email })
    if (!findUser) {
      throw new UserNotFound("User not found!", 404)
    }
    return findUser
  },

  async checkPassword(password, user) {
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new UserInvalidCredential("Invalid credentials", 400)
    }
    return isMatch
  }
}
