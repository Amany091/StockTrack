export type Products = {
    _id?: string,
    title: string,
    price: number,
    quantity: number,
    description: string,
    priceAfterDiscount?: number,
    imgCover?: string
}