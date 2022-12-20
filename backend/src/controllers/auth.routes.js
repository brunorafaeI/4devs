import { Router } from "express"
import multer from 'multer'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import upload from '../app/config/upload.js'
import UserModel from '../models/user/UserSchema.js'
import UserValidator from '../models/user/validators/UserValidator.js'
import { globalError } from "../app/config/global.js"

const AuthRouter = Router()
const picture = multer({ storage: upload.storage })

AuthRouter.post(
  "/register",
  picture.single("picture"),
  async (req, res) => {
    const { body } = req
    const { password } = body

    try {
      const salt = await bcrypt.genSalt()
      const passwordHash = await bcrypt.hash(password, salt)

      const newUser = new UserModel({
        ...body,
        password: passwordHash,
        viewedProfile: Math.floor(Math.random(2) * 100),
        impressions: Math.floor(Math.random(2) * 100)
      })

      const saveUser = await newUser.save()
      res.status(201).json(saveUser)

    } catch (err) {
      return globalError(err, res)
    }
  }
)

AuthRouter.post(
  "/login",
  async (req, res) => {
    const { body } = req
    const { email, password } = body

    try {
      const findUser = await UserValidator.findByEmail(email)
      await UserValidator.checkPassword(password, findUser)

      delete findUser.password

      const token = jwt.sign({ id: findUser.id }, process.env.JWT_SECRET)
      res.status(200).json({ user: findUser, token })

    } catch (err) {
      return globalError(err, res)
    }
  }
)

export default AuthRouter
