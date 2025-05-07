import {Box, Button, Typography} from "@mui/material";
import { AdditionalCharacteristicsBoxStyle, AdditionalCharacteristicsStyle, AddToCartButtonStyle, CharacteristicsStyle, DescriptionBoxStyle, MainCharacteristicsBoxStyle, ProductDetailsImageStyle, ProductDetailsMainStyle, ProductDetailsReturnPanelStyle, ProductDetailsWrapperStyle } from '@/style/ProductDetailsStyle';
import { ProductResponse } from "@/dto/ProductResponse";
import { RequestStatus } from "@/dto/RequestState";
import { ProductPriceStyle } from "@/style/style";

const ReturnPanel = (props: {
    onReturn: () => void,
}) => {
    return (<Box sx={ProductDetailsReturnPanelStyle}>
            <Button
                sx={{fontSize: '18px', textDecorationColor: 'black', color:'black',
                    '&:hover': {
                        textDecoration: 'underline',
                        backgroundColor: 'inherit'
                    },
                }}
                onClick={() => props.onReturn()}
            >
                Вернуться
            </Button>
        </Box>)
}

const Addch = (props: {
    product: ProductResponse,
}) => {
    return (
    <Box sx={AdditionalCharacteristicsBoxStyle}>
        <Box sx={DescriptionBoxStyle}>
            <Typography sx={{ fontSize: '24px',fontWeight: 'bold'}}>
                {`Описание`}</Typography>
            <Typography sx={{ fontSize: '18px',fontWeight: 'regular'}}>
                {`${props.product.description}`}</Typography>
        </Box>
        <Box sx={CharacteristicsStyle}>
            <Typography sx={{ fontSize: '24px',fontWeight: 'bold'}}>
                {`Характеристики`}</Typography>
            {Object.entries(props.product.characteristics).map(([key, value]) => (
                <Typography sx={{ fontSize: '18px',fontWeight: 'regular'}}>
                    {`${key}: ${value}`}</Typography>
            ))}
            
        </Box>
    </Box>)
}

const ProductDetailsView = (props: {
    status: RequestStatus,
    productDetails: ProductResponse | null,
    isAuth: boolean,
    onAddToCart: (productId: string) => void,
    onReturn: () => void,
}) => {
    console.log("Render ProductDetailsView")

    if (props.status === RequestStatus.Idle || props.status === 'loading') {
        return <div>Загрузка...</div>
    }

    if (props.status === 'error') {
        return <div>Ошибка загрузки данных</div>
    }

    const product = props.productDetails!
    console.log("cnt = " + product.count)

    if (product.count) {
        return <Box sx={ProductDetailsWrapperStyle}>
        <ReturnPanel onReturn={props.onReturn} />
        <Box sx={ProductDetailsMainStyle}>
            <Box sx={MainCharacteristicsBoxStyle}>
                <img src={product.imgRef} alt={product.name} style={ProductDetailsImageStyle} />
                <Box sx={AdditionalCharacteristicsStyle}>
                    <Typography sx={{ fontSize: '22px',fontWeight: 'bold'}}>
                        {`${product.name}`}</Typography>
                    <Typography sx={{ fontSize: '18px',fontWeight: 'regular'}}>
                        {`Производитель: ${product.manufacturerName}`}</Typography>
                    <Typography sx={{ fontSize: '18px',fontWeight: 'regular'}}>
                        {`Цвет: ${product.color}`}</Typography>
                    <Typography sx={{ fontSize: '18px',fontWeight: 'regular'}}>
                        {`Цена: ${product.price} Р`}</Typography>
                    {props.isAuth && (
                        <Typography sx={ProductPriceStyle}>{`В корзине: ${product.count}`}</Typography>
                    )}
                </Box>
            </Box>
            <Addch product={product} />
            </Box>
        </Box>
    }

    return <Box sx={ProductDetailsWrapperStyle}>
                <ReturnPanel onReturn={props.onReturn} />
                <Box sx={ProductDetailsMainStyle}>
                    <Box sx={MainCharacteristicsBoxStyle}>
                        <img src={product.imgRef} alt={product.name} style={ProductDetailsImageStyle} />
                        <Box sx={AdditionalCharacteristicsStyle}>
                            <Typography sx={{ fontSize: '22px',fontWeight: 'bold'}}>
                                {`${product.name}`}</Typography>
                            <Typography sx={{ fontSize: '18px',fontWeight: 'regular'}}>
                                {`Производитель: ${product.manufacturerName}`}</Typography>
                            <Typography sx={{ fontSize: '18px',fontWeight: 'regular'}}>
                                {`Цвет: ${product.color}`}</Typography>
                            <Typography sx={{ fontSize: '18px',fontWeight: 'regular'}}>
                                {`Цена: ${product.price} Р`}</Typography>
                            {props.isAuth && (
                                <Button
                                    sx={AddToCartButtonStyle}
                                    onClick={() => props.onAddToCart(product.id)}
                                >
                                    В корзину
                                </Button>
                            )}
                        </Box>
                    </Box>
                    <Addch product={product} />
                </Box>
            </Box>
}

export default ProductDetailsView;
