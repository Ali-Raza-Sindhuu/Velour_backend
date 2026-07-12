import auth_service from '../services/auth_service.js'

export const getAuth = async (req, res) => {
    res.send('Authentication API')
}

export const signUp = async (req, res) => {
    
    const result = await auth_service(req.body)
    
    return res.status(result.status).json(result)
}