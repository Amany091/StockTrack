"use client"
import React from 'react'
import { toast } from 'react-toastify'
import fetchApi from '@/src/utils/asyncWrapperApi'
import { Products } from '@/src/types/product'
import { UseFormFormik } from '@/src/hooks/useFormik'
import { fields, initalValues, validationSchema } from './addProductHelper'

type ProductsApi = {
    data: Products
}

const AddProductForm = ({ token }: { token: string | undefined }) => {

    async function addProduct(values: Products) {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value as string);
        });

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
