export class UserDTO {
  constructor({
    _id,
    firstName,
    lastName,
    email,
    picturePath,
    friends,
    location,
    occupation,
    viewedProfile,
    impressions,
    createAt,
    updateAt,
    __v,
  })
  {
    this._id = _id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.picturePath = picturePath
    this.friends = friends
    this.location = location
    this.occupation = occupation
    this.viewedProfile = viewedProfile
    this.impressions = impressions
    this.createAt = createAt
    this.updateAt = updateAt
    this.__v = __v
  }
}

export default UserDTO
