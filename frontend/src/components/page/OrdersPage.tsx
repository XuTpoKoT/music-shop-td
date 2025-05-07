import {Box, Container, CssBaseline} from "@mui/material";
import NavBar from '@/components/common/NavBar';
import { BasePageStyle } from '@/style/style';
import OrdersPageMain from "@/components/common/OrdersPageMain";
import ErrorPanel from "../presenter/ErrorPanel";
import SuccessPanel from "../presenter/SuccessPanel";

const OrdersPage = () => {
    return (
        <Container>
            <Box sx={BasePageStyle}>
                <CssBaseline/>
                <NavBar/>
                <OrdersPageMain></OrdersPageMain>
                <ErrorPanel />
                <SuccessPanel />
            </Box>
        </Container>
    );
};

export default OrdersPage;
