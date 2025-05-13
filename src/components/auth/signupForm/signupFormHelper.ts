import { FormField } from "@/src/hooks/useFormik";
import * as Yup from "yup"

export const signupFields: FormField[] = [
    {
        name: "name",
        isLabel: true,
        placeholder: "type your name",
        type: "input"
    }, {
        name: "email",
        isLabel: true,
        placeholder: "type your email",
        type: "input"
    },
    {
        name: "password",
        isLabel: true,
        placeholder: "type your password",
        type: "input",
        inputType: "password"
    },
    {
        name: "passwordConfirm",
        isLabel: true,
        placeholder: "type your password again",
        type: "input",
        inputType: "password"
    }
]

export const signUpInitialValues = { name: "", email: "", password: "", passwordConfirm: "" };

export const signupValidationSchema = Yup.object({
    name: Yup.string().required('name is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!, @, #, $, %, ^, &, *)"),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
});