import { useFormik } from "formik";
import * as Yup from "yup"
import { signup, accInfo } from "../interfaces/accInfo";

export function useLogin(cb: CallableFunction) {
    const formik = useFormik<accInfo>({
        initialValues: {
            email: "",
            password: ""
          },
          validationSchema: Yup.object({
            email: Yup.string().required("email is required"),
            password: Yup.string().required("password is required")
          }),
        onSubmit: (values)=> cb(values)
    })
    return formik
}

export function useSignup(cb: CallableFunction) {
    const formik = useFormik<signup>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('name is required'),
            email: Yup.string().email().required('Email is required'),
            password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!, @, #, $, %, ^, &, *)"),
            passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
        }),
        onSubmit: (values) => cb(values)
    })
    return formik
}

export function useAddProduct(cb: CallableFunction) { 
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: 0,
            priceAfterDiscount: 0,
            quantity: 0,
            imgCover: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            price: Yup.number().required('Price is required'),
            priceAfterDiscount: Yup.number().max(Yup.ref("price"), "Price after discount must be lower than the original price") ,
            quantity: Yup.number().required('Quantity is required'),
            imgCover: Yup.string().required('Image is required'),
        }),
        onSubmit: (values) => cb(values)
    })
    return formik
}
