import express from 'express'
import { getAuth, login, signUp } from '../controllers/auth_controller.js';
import validate from '../middleware/validate_middleware.js';
import { loginSchema, signupSchema } from '../data_schema/auth_schema.js';

const router = express.Router()

router.get('/', getAuth)
router.post('/signup', validate(signupSchema), signUp)
router.post('/login', validate(loginSchema), login)

export default router