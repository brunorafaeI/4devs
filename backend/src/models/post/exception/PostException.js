import { AppError } from '../../../app/config/global.js'

export class PostNotFound extends AppError {
  constructor (message = 'Post not found', statusCode = 404) {
    super(message, statusCode)
  }
}
