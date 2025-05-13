"use client"
import { ErrorMessage, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react'
import { VscNewFile } from 'react-icons/vsc';

type FileProps = {
    initalImageURL?: string;
    name: string;
}

function FileInput({ initalImageURL, name }: FileProps) {
    const [preview, setPreview] = useState<string | null>()
    const { setFieldValue } = useFormikContext<{ [key: string]: File }>()

    useEffect(() => {
        if (initalImageURL) {
            setPreview(initalImageURL)
        };
    }, [initalImageURL])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFieldValue(name, file)
            const reader = new FileReader()
            reader.onloadend = () => setPreview(reader.result as string)
            reader.readAsDataURL(file)
        }
    }
    return (
        <>
            <div className='flex items-center justify-center flex-col'>
                <label htmlFor={name}>
                    <div className='border-2 size-28 rounded-full border-gray-300 flex items-center justify-center overflow-hidden'>
                        {preview ? (
                            <img
                                src={preview}
                                alt="product-preview"
                                className='w-full rounded-full object-cover h-full'
                            />
                        ) : (
                            <div className='flex flex-col'>
                                <VscNewFile size={20} />
                                <span className='text-sm text-slate-200' >Upload Image</span>
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        id={name}
                        name={name}
                        className='hidden'
                        accept='image/png image/jpg image/jpeg'
                        onChange={handleFileChange}
                    />
                </label>
                <p className='font-semibold text-center'>Product Image</p>
            </div>
            <ErrorMessage
                name={name}
                className='text-sm text-red-500 text-center'
                component={"div"}
            />
        </>
    )
}

export default FileInput
