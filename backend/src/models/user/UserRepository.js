import bcrypt from 'bcrypt'

import UserModel from './UserSchema.js'
import {
  UserInvalidCredential,
  UserActionNotValid,
  UserNotFound,
  UserEmailAlreadyExists
} from './excepction/UserException.js'
import UserDTO from './UserDTO.js'

export default {
  async findAll () {
    const findUsers = await UserModel.find()
    return findUsers.map(user => new UserDTO(user))
  },

  async findById (id) {
    const findUser = await UserModel.findById(id)
    if (!findUser) {
      throw new UserNotFound()
    }

    return new UserDTO(findUser)
  },

  async checkLogin (email, password) {
    const findUser = await UserModel.findOne({ email })
    if (!findUser) {
      throw new UserNotFound()
    }

    if (!bcrypt.compareSync(password, findUser.password)) {
      throw new UserInvalidCredential()
    }

    return new UserDTO(findUser)
  },

  async create (objUser) {
    const { email, password } = objUser
    await this.checkIfEmailExists(email)

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new UserModel({
      ...objUser,
      password: passwordHash,
      viewedProfile: Math.floor(Math.random(2) * 100),
      impressions: Math.floor(Math.random(2) * 100)
    })

    const saveUser = await newUser.save()
    return new UserDTO(saveUser)
  },

  async update (id, objUser) {
    const findUser = await UserModel.findById(id)
    if (!findUser) {
      throw new UserNotFound()
    }

    await UserModel.updateOne(
      { _id: id },
      { $set: objUser, $currentDate: { lastModified: true } }
    )

    return new UserDTO(Object.assign(findUser, objUser))
  },

  async updateFriend (id, friendId) {
    if (id === friendId) {
      throw new UserActionNotValid("You can't add your own account as friend!")
    }

    const findUser = await this.findById(id)
    const findFriend = await this.findById(friendId)

    this.updateByFriendId(findUser, friendId)
    this.updateByFriendId(findFriend, id)
  },

  async updateByFriendId (objUser, friendId) {
    const updateSet = objUser.friends.includes(friendId)
      ? { $pull: { friends: friendId } }
      : { $addToSet: { friends: friendId } }

    await UserModel.updateOne({ _id: objUser._id }, updateSet)
  },

  async checkIfEmailExists (email) {
    const findUser = await UserModel.findOne({ email })
    if (findUser) {
      throw new UserEmailAlreadyExists()
    }
  }
}
