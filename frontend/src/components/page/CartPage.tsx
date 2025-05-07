import {Box, Container, CssBaseline} from "@mui/material";
import NavBar from '@/components/common/NavBar';
import { BasePageStyle } from '@/style/style';
import { CartPageMain } from "@/components/common/CartPageMain";
import ErrorPanel from "@/components/presenter/ErrorPanel";

const CartPage = () => {
    return (
        <Container>
            <Box sx={BasePageStyle}>
                <CssBaseline />
                <NavBar/>
                <CartPageMain></CartPageMain>
                <ErrorPanel />
            </Box>
        </Container>
        
    );
};

export default CartPage;
