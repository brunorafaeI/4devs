import 'dotenv/config'

import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import compression from 'compression'
// import bodyParser from 'body-parser'

import './app/config/mongodb.js'
import routes from './routers/index.js'
import { uploadSetting } from './app/config/upload.js'
import { globalError } from './app/config/global.js'

const app = express()

app.use(cors())
app.use(compression())
app.use(express.json())

// app.use(bodyParser.json({ limit: "30mb", extended: true }))
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use('/images', express.static(uploadSetting.directory))

app.use(routes)
app.use(globalError)

export default app
