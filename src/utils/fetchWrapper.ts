export async function getProducts({ page , minPrice, maxPrice }: { page: string | undefined, minPrice: string | undefined, maxPrice: string | undefined }) {
    const res = await fetch(`http://localhost:3000/api/query?page=${page}&min-price=${minPrice}&max-price=${maxPrice}`, {
        method: 'GET',
        cache: "default"
    })
    const { data, limit, total } = await res.json()
    return { data, limit, total }
}