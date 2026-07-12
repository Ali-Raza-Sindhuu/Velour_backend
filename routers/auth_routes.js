import express from 'express'
import { getAuth, signUp } from '../controllers/auth_controller.js';
import validate from '../middleware/validate_middleware.js';
import signupSchema from '../data_schema/auth_schema.js';

const router = express.Router()

router.get('/', getAuth)
router.post('/signup', validate(signupSchema), signUp)

export default router