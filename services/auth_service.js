import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../Queries/user_query.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import redisClient from "../config/redis.js";

export const signupService = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    return {
      success: false,
      status: 409,
      message: "Email Already Exist",
    };
  }

  const hashPassword = await bcrypt.hash(userData.password, 10);

  const userId = await createUser({
    firstname: userData.firstName,
    lastname: userData.lastName,
    email: userData.email,
    password: hashPassword,
    role: userData.role,
  });
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
  };
};


//Login Logic
export const loginService = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);

  if (!existingUser) {
    return {
      success: false,
      status: 401,
      message: "Try to Sign Up",
    };
  }

  const isMatch = await bcrypt.compare(
    userData.password,
    existingUser.password,
  );

  if (!isMatch) {
    return {
      success: false,
      status: 401,
      message: "Email or Password invalid",
    };
  }

  const accessToken = generateAccessToken(existingUser);
  const refreshToken = generateRefreshToken(existingUser);

  await redisClient.set(
    `refresh:${existingUser.id}`,
    refreshToken,
    {
        EX : 60 * 60 * 24 * 7,
    }
  )
  return {
    success: true,
    status: 200,
    message: "User Login successfully.",
    AccessToken :accessToken,
    refreshToken : refreshToken,
    data: {
      id: existingUser.id,
      firstName: existingUser.first_name,
      lastName: existingUser.last_name,
      email: existingUser.email,
      role: existingUser.role,
    },
  };
};
