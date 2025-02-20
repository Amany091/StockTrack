import { Products } from "@/src/types/product";
import fetchApi from "@/src/utils/asyncWrapperApi";
import { NextRequest, NextResponse } from "next/server";

type ProductsApi = {
    data: Products,
    total: number,
    limit: number
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const query = searchParams.get("page") || "1"
    const maxPrice = searchParams.get("max-price") || "0"
    const minPrice = searchParams.get("min-price") || "0"

    const { data, total, limit } = await fetchApi<ProductsApi>({
        baseUrl: String(process.env.NEXT_PUBLIC_BASE_URL),
        method: "GET",
        endPoint: "products",
        searchParams: { page: query, maxPrice, minPrice }
    })

    return NextResponse.json({ data, total, limit })
}