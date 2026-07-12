import {z} from 'zod'

const signupSchema = z.object({
    firstName : z
    .string()
    .trim()
    .min(2, 'First  name must be atleast 2 characters')
    .max(50, "First Name can't exceed 50 characters")
    .regex(/^[A-Za-z\s]+$/,'First Name only contain letter and spaces'),

    lastName : z
    .string()
    .trim()
    .min(2, 'Last  name must be atleast 2 characters')
    .max(50, "Last Name can't exceed 50 characters")
    .regex(/^[A-Za-z\s]+$/,'Last Name only contain letter and spaces'),

    email : z
      .string()
      .trim()
      .toLowerCase()
      .email('please enter valid email'),

    password : z 
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(100, "Password cannot exceed 100 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character."
      ),
})

export default signupSchema;