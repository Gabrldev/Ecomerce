import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, picturePath, friends,location,ocupation} = req.body
    } catch (error) {
        
    }

}
const login = async (req, res) => {
}

export { register, login }