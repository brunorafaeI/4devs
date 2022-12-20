import bcrypt from 'bcrypt'

import UserModel from '../UserSchema.js'
import { UserInvalidCredential, UserNotFound } from './excepction/UserException.js'

export default  {
  async checkById(id) {
    const findUser = await UserModel.findById(id)
    if (!findUser) {
      throw new UserNotFound("User not found!", 404)
    }
    return findUser
  },

  async checkByEmail(email) {
    const findUser = await UserModel.findOne({ email })
    if (!findUser) {
      throw new UserNotFound("User not found!", 404)
    }
    return findUser
  },

  async checkFriend(id, friendId) {
    if (id === friendId) {
      throw new UserInvalidCredential("You can't update your own account!")
    }

    const findUser = await this.checkById(id)
    const findFriend = await this.checkById(friendId)

    this.updateFriend(findUser, friendId)
    this.updateFriend(findFriend, id)
  },

  async updateFriend(objUser, friendId) {
    const updateSet = objUser.friends.includes(friendId)
      ? { $pull: { friends: friendId } }
      : { $addToSet: { friends: friendId } }

    await UserModel.updateOne({ _id: objUser._id }, updateSet)
  },

  async checkPassword(password, user) {
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new UserInvalidCredential("Invalid credentials", 400)
    }
    return isMatch
  }
}
