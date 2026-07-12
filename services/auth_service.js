import bcrypt from "bcryptjs";
import {createUser, findUserByEmail }from "../Queries/user_query.js";

const signupService = async (userData) => {

    const existingUser = await findUserByEmail(userData.email)

    if(existingUser){
        return {
            success : false,
            status : 409,
            message : "Email Already Exist",
        }
    }

    const hashPassword = await bcrypt.hash(userData.password, 10)
   
    const userId = await createUser({
        firstname : userData.firstName,
        lastname : userData.lastName,
        email : userData.email,
        password : hashPassword,
        role : userData.role
    })
    return {
         success: true,
    status: 201,
    message: "User registered successfully.",
    data: {
      id: userId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: "USER",
    },
}

}

export default signupService