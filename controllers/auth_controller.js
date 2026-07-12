import  { loginService, signupService } from '../services/auth_service.js'

export const getAuth = async (req, res) => {
    res.send('Authentication API')
}

export const signUp = async (req, res) => {
    const result = await signupService(req.body)
    return res.status(result.status).json(result)
}

export const login = async (req, res) => {
    const result = await loginService(req.body);

    res.cookie('refreshToken', result.refreshToken, {
        httpOnly : true,
        secure : false,
        sameSlice : "lax",
        maxAge : 7 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({
  success: true,
  message: "Login Successful",
  data: {
    accessToken: result.AccessToken,
    user: result.data.email,
  },
});
}