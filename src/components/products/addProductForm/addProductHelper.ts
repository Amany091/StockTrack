import * as Yup from "yup"

export const initalValues = {
    title: "",
    price: 0,
    description: "",
    priceAfterDiscount: 0,
    quantity: 0,
    imgCover: ""
}

export const fields = [
    {
        name: "imgCover",
        isLabel: false,
        placeholder: "product image",
        type: "file"
    },
    {
        name: "title",
        isLabel: true,
        placeholder: "product title",
        type: "input",
    }, {
        name: "price",
        isLabel: true,
        placeholder: "product price",
        type: "input",
    },
    {
        name: "description",
        isLabel: true,
        placeholder: "product description",
        type: "input",
    },
    {
        name: "priceAfterDiscount",
        isLabel: true,
        placeholder: "product price after discount",
        type: "input",
    }
]

export const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    priceAfterDiscount: Yup.number().max(Yup.ref("price"), "Price after discount must be lower than the original price"),
    quantity: Yup.number().required('Quantity is required'),
    image: Yup.mixed()
});