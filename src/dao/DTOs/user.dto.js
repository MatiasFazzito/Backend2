export default class UserDto {
    constructor(user) {
        this.id = user._id
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.age = user.age
        this.role = user.role
    }
}