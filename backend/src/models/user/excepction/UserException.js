import { AppError } from "../../../app/config/global.js";

export class UserNotFound extends AppError {
  constructor(message = "User not found", statusCode = 404) {
    super(message, statusCode)
  }
}
export class UserInvalidCredential extends AppError {
  constructor(message = "Invalid user credentials!", statusCode = 401) {
    super(message, statusCode)
  }
}

export class UserActionNotValid extends AppError {
  constructor(message = "User action not valid.", statusCode = 400) {
    super(message, statusCode)
  }
}

export class UserEmailAlreadyExists extends AppError {
  constructor(message = "User already existis.", statusCode = 400) {
    super(message, statusCode)
  }
}
