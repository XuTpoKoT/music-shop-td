import { create } from "zustand";
import { persist } from "zustand/middleware";
import CartItemsApi from "../api/CartItemsApi";
import { CartItemResponse, CartItemResponseSchema } from "../dto/CartItemResponse ";
import { RequestStatus } from "../dto/RequestState";
import { useErrorStore } from "./ErrorStore";
import { getServerErrorMessage } from "@/api";

interface CartItemsState {
    status: RequestStatus;
    cartItems: CartItemResponse[] | null;
    addCartItem: (productId: string) => void;
    fetchCartItems: () => void;
    updateCartItem: (cartItemId: string, newCount: number) => void;
    deleteCartItem: (cartItemId: string) => void;
    cleanCart: () => void;
}

export const useCartItemsStore = create<CartItemsState>()(
    persist(
        (set, get) => ({
            status: RequestStatus.Idle,
            errorMessage: null,
            cartItems: null,
            addCartItem: async (productId) => {
                set({status: RequestStatus.Loading})
                try {
                    const response = await CartItemsApi.addCartItem(productId);
                    const validatedResponse = CartItemResponseSchema.parse(response)
                    const existingCartItems = get().cartItems ?? []; 
                    const ci = [...existingCartItems, validatedResponse];
                    set({ status: RequestStatus.Success, cartItems: ci });
                } catch (e) {                    
                    const errMsg = getServerErrorMessage(e)
                    console.log(errMsg)
                    set({ status: RequestStatus.Error });
                    useErrorStore.setState({errorMessage: errMsg})
                }
            },
            fetchCartItems: async () => {
                set({ status: RequestStatus.Loading });
                try {
                    const response = await CartItemsApi.getCartItems();
                    const validatedResponse = CartItemResponseSchema.array().parse(response)
                    set({ status: RequestStatus.Success, cartItems: validatedResponse });
                } catch (e) {
                    const errMsg = getServerErrorMessage(e);
                    console.error(errMsg);
                    set({ status: RequestStatus.Error, cartItems: null });
                    useErrorStore.setState({ errorMessage: errMsg });
                }
            },
            updateCartItem: async (cartItemId, newCount) => {
                set({ status: RequestStatus.Loading });
                try {
                    const updatedItem = await CartItemsApi.updateCartItem(cartItemId, newCount);
                    const currentItems = get().cartItems || []
                    const updatedItems = currentItems.map(item => 
                        item.id === cartItemId ? updatedItem : item
                    );
                    set({ status: RequestStatus.Success, cartItems: updatedItems });
                } catch (e) {
                    const errMsg = getServerErrorMessage(e);
                    console.error(errMsg);
                    set({ status: RequestStatus.Error });
                    useErrorStore.setState({ errorMessage: errMsg });
                }
            },
            deleteCartItem: async (cartItemId) => {
                set({ status: RequestStatus.Loading });
                try {
                    await CartItemsApi.deleteCartItem(cartItemId);
                    const currentItems = get().cartItems || [];
                    const updatedItems = currentItems.filter(item => item.id !== cartItemId);
                    set({ status: RequestStatus.Success, cartItems: updatedItems });
                } catch (e) {
                    const errMsg = getServerErrorMessage(e);
                    console.error(errMsg);
                    set({ status: RequestStatus.Error });
                    useErrorStore.setState({ errorMessage: errMsg });
                }
            },
            cleanCart: () => {
                set({ status: RequestStatus.Idle, cartItems: [] });
            }
        }),
        {
            name: 'cartItems-storage',
            getStorage: () => sessionStorage,
        }
    )
);
