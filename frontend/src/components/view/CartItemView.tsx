import {Box, Button, Typography} from "@mui/material";
import { ProductImageStyle, ProductNameStyle, ProductPriceStyle } from '@/style/style';
import { CartItemActionsBoxStyle, CartItemContentStyle, CartItemImageStyle, CartItemInfoStyle, CartItemNamePriceBoxStyle, CartItemWrapperStyle } from '@/style/CartStyle';
import { CartItemResponse } from '@/dto/CartItemResponse ';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

export const CartItemView = (props: {
    cartItem: CartItemResponse,
    onIncreaseCount: (cartItemId: string, oldCount: number) => void,
    onDecreaseCount: (cartItemId: string, oldCount: number) => void,
    onDeleteItem: (cartItemId: string) => void,
}) => {
    return (
        <Box sx={CartItemWrapperStyle}>
            <Box sx={CartItemContentStyle}>
                <Box sx={CartItemInfoStyle}>
                    <img src={props.cartItem.imgRef} alt={props.cartItem.name} style={CartItemImageStyle} />
                    <Box sx={CartItemNamePriceBoxStyle}>
                        <Typography sx={ProductNameStyle}>
                            {props.cartItem.name}
                        </Typography>
                        <Typography sx={ProductPriceStyle}>{`${props.cartItem.price} Р`}</Typography>
                    </Box>
                </Box>
                <Box sx={CartItemActionsBoxStyle}>
                <Button 
                        sx={{ minWidth: '40px', height: '30px' }} 
                        onClick={() => props.onDecreaseCount(props.cartItem.id, props.cartItem.count)}
                    >
                        <RemoveIcon />
                    </Button>
                    <Typography sx={{ mx: 2 }}>{props.cartItem.count}</Typography>
                    <Button 
                        sx={{ minWidth: '40px', height: '30px' }} 
                        onClick={() => props.onIncreaseCount(props.cartItem.id, props.cartItem.count)}
                    >
                        <AddIcon />
                    </Button>
                    <Button 
                        sx={{ ml: 3, minWidth: '40px', height: '30px' }} 
                        onClick={() => props.onDeleteItem(props.cartItem.id)}
                    >
                        <DeleteIcon />
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

