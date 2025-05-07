import {Box, Container, CssBaseline} from "@mui/material";
import { BasePageStyle } from '@/style/style';
import NavBar from '@/components/common/NavBar';
import ProductDetailsPresenter from '@/components/presenter/ProductDetailsPresenter';
import ErrorPanel from "../presenter/ErrorPanel";

const ProductDetailsPage = () => {
    return (
        <Container>
            <Box sx={BasePageStyle}>
                <CssBaseline />
                <NavBar/>
                <ProductDetailsPresenter></ProductDetailsPresenter>
                <ErrorPanel />
            </Box>
        </Container>
        
    );
};

export default ProductDetailsPage;
