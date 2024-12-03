"use client"
import Form from 'next/form'
import React, { useState } from 'react'
import Input from './Input'
import { useAddProduct } from '../hooks/useCostomeFormik'
import { toast } from 'react-toastify'
import fetchApi from '../utils/asyncWrapperApi'
import { Products } from '../interfaces/products'

type ProductsApi = {
    data : Products
}

const AddProductForm = ({token}:{token:string | undefined}) => {
    const formik = useAddProduct(addProduct)
    const [isLoading, setIsLoading] = useState(false)
    
    async function addProduct() {
        setIsLoading(true)
        const formData = new FormData()
        Object.entries(formik.values).forEach(([key, value]) => {
            formData.append(key, value as string);
        });

        if (!token) {
            toast.error("You are not allowed to access this route , Plz login first");
            setIsLoading(false)
            return
        };

        try {

            const { data } = await fetchApi<ProductsApi>({
                baseUrl: String(process.env.NEXT_PUBLIC_BASE_URL),
                endPoint: "products",
                method: "POST",
                credentials: "include",
                body: formData
            })
            if (data) {
                toast.success("Product Added Successfully")
                formik.resetForm()
            } else {
                toast.error("Failed to add product")
                setIsLoading(false)
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
        console.log(isLoading)
    }
    


    return (
        <Form
            action={""}
            formEncType='multipart/form-data'
            className='flex flex-col gap-3 w-full'
            onSubmit={formik.handleSubmit}
        >
            <div id="productTitle">
                <label htmlFor="title">title*</label>
                <Input
                    id='title'
                    name='title'
                    type='text'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.errors.title && formik.touched.title && <p className='text-red-500'>{formik.errors.title}</p>}
            </div>

            <div id="productDescription">
                <label htmlFor="description">description*</label>
                <Input
                    id='description'
                    name='description'
                    type='text'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.errors.description && formik.touched.description && <p className='text-red-500'>{formik.errors.description}</p>}
            </div>

            <div id="productPrice">
                <label htmlFor="price">price*</label>
                <Input
                    id='price'
                    name='price'
                    type='numbrt'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.errors.price && formik.touched.price && <p className='text-red-500'>{formik.errors.price}</p>}
            </div>

            <div id="productPriceAfterDiscount">
                <label htmlFor="priceAfterDiscount">priceAfterDiscount *optional </label>
                <Input
                    id='priceAfterDiscount'
                    name='priceAfterDiscount'
                    type='number'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.errors.priceAfterDiscount && formik.touched.priceAfterDiscount && <p className='text-red-500'>{formik.errors.priceAfterDiscount}</p>}
            </div>

            <div id="productQuantity">
                <label htmlFor="quantity">quantity*</label>
                <Input
                    id='quantity'
                    name='quantity'
                    type='number'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.errors.quantity && formik.touched.quantity && <p className='text-red-500'>{formik.errors.quantity}</p>}
            </div>

            <div id="productImgCover">
                <label htmlFor="imgCover">imgCover*</label>
                <Input
                    id='imgCover'
                    name='imgCover'
                    type='file'
                    accept='image/*'
                    onBlur={formik.handleBlur}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        if (event.target.files && event.target.files[0]) {
                            formik.handleChange({ target: { name: 'imgCover', value: event.target.files[0] } })
                        }
                    }}
                />
                {formik.errors.imgCover && formik.touched.imgCover && <p className='text-red-500'>{formik.errors.imgCover}</p>}
            </div>

            <button
                type="submit"
                className='bg-button p-2 w-40 rounded text-white '
            > {isLoading ? "Submitting..." : "Submit"} </button>

        </Form>
    )
}

export default AddProductForm
