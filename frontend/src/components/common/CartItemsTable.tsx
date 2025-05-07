import { useEffect } from 'react';
import { useCartItemsStore } from '@/store/CartItemsStore';
import { CartItemsTableView } from '@/components/view/CartItemsTableView';

export const CartItemsTable = () => {
    const fetchCartItems = useCartItemsStore((state) => state.fetchCartItems)
    const updateCartItem = useCartItemsStore((state) => state.updateCartItem)
    const deleteCartItem = useCartItemsStore((state) => state.deleteCartItem)
    const cartItems = useCartItemsStore((state) => state.cartItems)

    useEffect(() => {
        fetchCartItems()
    }, [fetchCartItems]);

    const onDeleteItem = (cartItemId: string) => {
        console.log("onDeleteItem " + cartItemId)
        deleteCartItem(cartItemId)
    }

    const onIncreaseCount = (cartItemId: string, oldCount: number) => {
        console.log("onIncreaseCount " + cartItemId)
        updateCartItem(cartItemId, oldCount + 1)
    }

    const onDecreaseCount = (cartItemId: string, oldCount: number) => {
        console.log("onDecreaseCount " + cartItemId)
        updateCartItem(cartItemId, oldCount - 1)
    }

    return (
        <CartItemsTableView cartItems={cartItems} onDeleteItem={onDeleteItem} onIncreaseCount={onIncreaseCount}
         onDecreaseCount={onDecreaseCount}>
        </CartItemsTableView>
    );
};

