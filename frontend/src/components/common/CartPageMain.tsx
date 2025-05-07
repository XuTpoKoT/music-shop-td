import {Box} from "@mui/material";
import { CartPageMainStyle } from "@/style/CartStyle";
import { CartItemsTable } from "./CartItemsTable";
import { MakeOrder } from "./MakeOrder";

export const CartPageMain = () => {
    console.log("Render CartPageMain")

    return (
        <Box sx={CartPageMainStyle}>
            <CartItemsTable></CartItemsTable>
            <MakeOrder></MakeOrder>
        </Box>
    )
}

