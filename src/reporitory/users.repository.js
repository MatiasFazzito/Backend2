import UserDTO from "../dao/DTOs/user.dto.js"

export default class UserRepository {
    constructor(dao){
        this.dao = dao
    }

    getUsers = async () =>{
        const result = await this.dao.get()
        return result
    }

    
}