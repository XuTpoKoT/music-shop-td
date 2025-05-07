import { CartItemResponse } from '@/dto/CartItemResponse ';
import { CartTableStyle } from '@/style/CartStyle';
import { Box } from '@mui/material';
import { CartItemView } from './CartItemView';

export const CartItemsTableView = (props: {
    cartItems: CartItemResponse[] | null,
    onIncreaseCount: (cartItemId: string, oldCount: number) => void,
    onDecreaseCount: (cartItemId: string, oldCount: number) => void,
    onDeleteItem: (cartItemId: string) => void,
}) => {
    console.log("Render CartItemsTableView")

    if (!props.cartItems || props.cartItems.length == 0) {
        return  <Box sx={CartTableStyle}>
                    <div>Корзина пуста</div>
                </Box>
    }
        

    return (
        <Box sx={CartTableStyle}>
            {props.cartItems.map(c => {
                return (
                    <CartItemView cartItem={c} onIncreaseCount={props.onIncreaseCount}
                    onDecreaseCount={props.onDecreaseCount} onDeleteItem={props.onDeleteItem}></CartItemView>
                )})}
        </Box>
    )
}

