import { Router } from 'express'

import { uploadStorage } from '../app/config/upload.js'
import UserRepository from '../models/user/UserRepository.js'
import authConfig from '../app/config/auth.js'

const AuthRouter = Router()

AuthRouter.post(
  '/register',
  uploadStorage.single('picture'),
  async (req, res) => {
    const { body } = req

    const saveUser = await UserRepository.create(body)
    res.status(201).json({ user: saveUser })
  }
)

AuthRouter.post(
  '/login',
  async (req, res) => {
    const { body } = req
    const { email, password } = body

    const findUser = await UserRepository.checkLogin(email, password)
    const token = authConfig.createToken(findUser._id)

    res.status(200).json({ user: findUser, token })
  }
)

export default AuthRouter
