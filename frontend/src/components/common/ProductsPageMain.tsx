import {Box} from "@mui/material";
import FiltersPresenter from '@/components/presenter/FiltersPresenter';
import { ProductsPageMainStyle } from '@/style/style';
import { ProductsPageMainContent } from "./ProductsPageMainContent";

const ProductsPageMain = () => {
    console.log("Render ProductsPageMain")

    return (
        <Box sx={ProductsPageMainStyle}>
            <FiltersPresenter></FiltersPresenter>
            <ProductsPageMainContent></ProductsPageMainContent>
        </Box>
    )
}

export default ProductsPageMain;
