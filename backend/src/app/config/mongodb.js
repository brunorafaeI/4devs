import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGO_DB_URL)
  } catch (err) {
    console.log(`${err} did not connected!`)
  }
}

connectDB()
