export interface CreateCartItemDto {
    quantity: number;
    productId: string;
}

export interface UpdateCartItemDto {
    quantity: number;
}