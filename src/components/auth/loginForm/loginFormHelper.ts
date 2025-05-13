import * as Yup from "yup"

export const loginFields = [
    {
        name: "email",
        isLabel: true,
        type: "input",
        placeholder: "Email",
    },
    {
        name: "password",
        isLabel: true,
        type: "input",
        placeholder: "type your password",
        inputType: "password"
    }
]

export const loginInitialValues = { email: "", password: "" }

export const loginValidationSchema = Yup.object({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("password is required")
});