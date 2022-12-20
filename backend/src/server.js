import app from './app.js'

const SERVER_PORT = Number(process.env.APP_PORT) || 6001;

app.listen(SERVER_PORT, "0.0.0.0", () => {
  console.log(`🚀 Server started on port ${SERVER_PORT}`)
})

