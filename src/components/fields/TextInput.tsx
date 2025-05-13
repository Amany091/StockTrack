"use client"
import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type TextinputProps = {
    name: string;
    className?: string;
    placeholder: string;
    inputType?: string
}

const TextInput = ({ name, className, placeholder, inputType }: TextinputProps) => {
    const [isHide, setIsHide] = useState(false)

    return (
        <div>
            <div className="relative">
                <Field
                    type={inputType === "password" ? (isHide ? "text" : "password") : inputType}
                    name={name}
                    placeholder={placeholder || name}
                    className={className || "w-full rounded-lg p-3 focus:outline-cyan-600"}
                />
                {inputType === "password" && (
                    <button
                        type="button"
                        className="absolute end-3 top-3 rounded-full bg-blue-50 size-8 flex items-center justify-center"
                        onClick={() => setIsHide(!isHide)}
                    >
                        {isHide ? <FaEye /> : <FaEyeSlash />}
                    </button>
                )}
            </div>
            <ErrorMessage
                component={"div"}
                name={name}
                className="text-sm text-red-500"
            />
        </div>
    );
}

export default TextInput;