import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";

export type FormField = {
    isLabel: boolean;
    name: string;
    placeholder: string;
    type: string;
    classname?: string;
}
export type UseFormikProps<T> = {
    initalValues: T;
    onSubmit: (values: T, action: FormikHelpers<T>) => void;
    formCalssName?: string;
    validationSchema: Yup.ObjectSchema<any>;
    fields: FormField[];
}


export const UseFormFormik = <T extends object>({
    initalValues,
    onSubmit,
    formCalssName,
    validationSchema,
    fields
}: UseFormikProps<T>) => {
    const [isHide, setIsHide] = useState(false)
    return (
        <Formik
            initialValues={initalValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, handleChange }) => (
                <Form className="flex flex-col gap-4" >
                    {fields.map((field) => (
                        <div className="text-black flex flex-col gap-1" key={field.name} >
                            {field.isLabel && <label htmlFor={field.name} > {field.name} </label>}
                            <div className="relative">
                                <Field
                                    type={field.type === "password" ? (isHide ? "text" : "password") : field.type}
                                    name={field.name}
                                    placeholder={field.placeholder || field.name}
                                    className={field.classname || "w-full rounded-lg p-3 focus:outline-cyan-600"}
                                    onChange={handleChange}
                                />
                                {field.type === "password" ? (isHide ?
                                    <FaEyeSlash className="text-gray-500 cursor-pointer absolute top-4 right-5" onClick={() => setIsHide(!isHide)} />
                                    :
                                    <FaEye className="text-gray-500 cursor-pointer absolute top-4 right-5" onClick={() => setIsHide(!isHide)} />
                                ) : ""}
                            </div>
                            <ErrorMessage
                                name={field.name}
                                component="div"
                                className="text-red-500 text-xs"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="p-3 rounded-lg bg-cyan-500 transition-all hover:bg-cyan-600 w-1/2 my-5 mx-auto "
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </Form>
            )}
        </Formik>
    )
}