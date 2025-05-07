import { CartItemResponse } from "@/dto/CartItemResponse ";
import $api from ".";

export default class CartItemsApi {
    static async addCartItem(productId: string) {
        const username = localStorage.getItem('username')
        return await $api.post<CartItemResponse>(`/cart`, { product_id: productId })
            .then(response => response.data)
    }
    static async getCartItems() {
        const username = localStorage.getItem('username')
        return await $api.get<CartItemResponse[]>(`/cart`)
            .then(response => response.data)
    }
    static async updateCartItem(cartItemId: string, newCount: number) {
        const username = localStorage.getItem('username')
        return await $api.patch(`/cart/${cartItemId}`, {
            count: newCount})
            .then(response => response.data)
    }
    static async deleteCartItem(cartItemId: string) {
        const username = localStorage.getItem('username')
        return await $api.delete(`/cart/${cartItemId}`)
            .then(response => response.data)
    }
}

