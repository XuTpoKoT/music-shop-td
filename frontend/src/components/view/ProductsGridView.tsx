import Grid from '@mui/material/Grid';
import { ProductsGridStyle } from '@/style/style';
import ProductCardView from './ProductCardView';
import { ProductPageResponse } from '@/dto/ProductPageResponse';

const ProductsGridView = (props: {
    productPage: ProductPageResponse | null,
    isAuth: boolean,
    onAddToCart: (productId: string) => void,
}) => {
    console.log("Render ProductsGridView")

    if (!props.productPage) {
        return <div>Ошибка загрузки данных</div>
    }

    if (!props.productPage.content) {
        return <div>Нет таких товаров</div>
    }

    return (
        <Grid container sx={ProductsGridStyle} rowSpacing={'20px'} columnSpacing={'10px'}>
            {props.productPage.content?.map(p => {
                return (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <ProductCardView product={p} isAuth={props.isAuth} onAddToCart={props.onAddToCart}></ProductCardView>
                    </Grid>
                )})}
        </Grid>
    )
}

export default ProductsGridView;
