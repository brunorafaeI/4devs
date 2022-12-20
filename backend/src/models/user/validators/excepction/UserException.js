import { AppError } from "../../../../app/config/global.js";

export class UserNotFound extends AppError {}
export class UserInvalidCredential extends AppError {}
