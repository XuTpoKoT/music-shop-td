import { CartItemResponse } from "@/dto/CartItemResponse ";
import $api from ".";

export default class CartItemsApi {
    static async addCartItem(productId: string) {
        const username = localStorage.getItem('username')
        return await $api.post<CartItemResponse>(`/cartItems`, {productId})
            .then(response => response.data)
    }
    static async getCartItems() {
        const username = localStorage.getItem('username')
        return await $api.get<CartItemResponse[]>(`/cartItems`)
            .then(response => response.data)
    }
    static async updateCartItem(cartItemId: string, newCount: number) {
        const username = localStorage.getItem('username')
        return await $api.patch(`/cartItems/${cartItemId}`, {
            count: newCount})
            .then(response => response.data)
    }
    static async deleteCartItem(cartItemId: string) {
        const username = localStorage.getItem('username')
        return await $api.delete(`/cartItems/${cartItemId}`)
            .then(response => response.data)
    }
}

