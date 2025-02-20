"use client"
import React, { useState } from 'react'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import fetchApi from '../../utils/asyncWrapperApi'
import { Products } from '../../types/product'
import { UseFormFormik } from '@/src/hooks/useFormik'
import UploadImage from './UploadImage'

type ProductsApi = {
    data: Products
}

const initalValues = {
    title: "",
    price: 0,
    description: "",
    priceAfterDiscount: 0,
    quantity: 0,
    imgCover: ""
}

const fields = [
    {
        name: "title",
        isLabel: true,
        placeholder: "product title",
        type: "text",
    }, {
        name: "price",
        isLabel: true,
        placeholder: "product price",
        type: "number",
    },
    {
        name: "description",
        isLabel: true,
        placeholder: "product description",
        type: "text",
    }, {
        name: "priceAfterDiscount",
        isLabel: true,
        placeholder: "product price after discount",
        type: "number",
    }
]

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    priceAfterDiscount: Yup.number().max(Yup.ref("price"), "Price after discount must be lower than the original price"),
    quantity: Yup.number().required('Quantity is required'),
});

const AddProductForm = ({ token }: { token: string | undefined }) => {
    const [image, setImage] = useState<File | undefined>()

    async function addProduct(values: Products) {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        if (image) {
            formData.append('imgCover', image as File);
        }

        if (!token) {
            toast.error("You are not allowed to access this route , Plz login first");
            return false
        };

        const { data } = await fetchApi<ProductsApi>({
            baseUrl: String(process.env.NEXT_PUBLIC_BASE_URL),
            endPoint: "products",
            method: "POST",
            credentials: "include",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success("Product Added Successfully")
        return data;
    }

    return (
        <div>
            <UploadImage
                title={image}
                uploadImage={setImage}
            />
            <UseFormFormik
                fields={fields}
                initalValues={initalValues}
                onSubmit={addProduct}
                validationSchema={validationSchema}
            />
        </div>
    )
}

export default AddProductForm
