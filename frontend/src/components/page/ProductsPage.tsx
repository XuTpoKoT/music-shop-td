import {Box, Container, CssBaseline} from "@mui/material";
import { BasePageStyle } from '@/style/style';
import NavBar from '@/components/common/NavBar';
import ProductsPageMain from '@/components/common/ProductsPageMain';
import ErrorPanel from '@/components/presenter/ErrorPanel';
import SuccessPanel from "../presenter/SuccessPanel";

const ProductsPage = () => {
    return (
        <Container>
            <Box sx={BasePageStyle}>
                <CssBaseline />
                <NavBar/>
                <ProductsPageMain></ProductsPageMain>
                <ErrorPanel />
                <SuccessPanel />
            </Box>
        </Container>
        
    );
};

export default ProductsPage;
