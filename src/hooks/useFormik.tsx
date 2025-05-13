import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import FileInput from "../components/fields/FileInput";
import TextInput from "../components/fields/TextInput";

export type FormField = {
    isLabel: boolean;
    name: string;
    placeholder: string;
    type: string;
    classname?: string;
    initialImageURL?: string;
    inputType?: string;
}
export type UseFormikProps<T> = {
    initalValues: T;
    onSubmit: (values: T, action: FormikHelpers<T>) => void;
    formCalssName?: string;
    validationSchema: Yup.ObjectSchema<any>;
    fields: FormField[];
}

const renderField = (field: FormField) => {
    switch (field.type) {
        case "file": return (
            <FileInput
                name={field.name}
                initalImageURL={field.initialImageURL}
            />
        )
            break;
        case "input": return (
            <TextInput
                className={field?.classname}
                name={field.name}
                placeholder={field.placeholder}
                inputType={field.inputType}
            />
        );
            break;
    };
}


export const UseFormFormik = <T extends object>({
    initalValues,
    onSubmit,
    formCalssName,
    validationSchema,
    fields
}: UseFormikProps<T>) => {
    return (
        <Formik
            initialValues={initalValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4" >
                    {fields.map((field) => (
                        <div className="text-black flex flex-col gap-1" key={field.name} >
                            {field.isLabel && <label htmlFor={field.name} > {field.name} </label>}
                            {renderField(field)}
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