export function parseQuery(searchParams : Record<string, string>) {
    return {
        page: parseInt(searchParams.page || "1"),
        minPrice: parseInt(searchParams.minPrice || "0"),
        maxPrice: parseInt(searchParams.maxPrice || "3000")
    }
}