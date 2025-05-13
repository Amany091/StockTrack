"use client"
import { Products } from "@/src/types/product";
import fetchApi from "@/src/utils/asyncWrapperApi";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";

const DeleteProduct = ({ product }: { product: Products }) => {

    const handleDelete = async (item: Products) => {
        const response = await fetchApi({
            method: 'DELETE',
            baseUrl: String(process.env.NEXT_PUBLIC_BASE_URL),
            endPoint: `products/${item._id}`,
            credentials: 'include',
        })
        if (response) toast.success("product deleted successfully");
    }

    return (
        <button
            onClick={() => handleDelete(product)}
            className='text-red-500 absolute top-1 end-1' >
            <FaTrash size={15} />
        </button>
    );
}

export default DeleteProduct;