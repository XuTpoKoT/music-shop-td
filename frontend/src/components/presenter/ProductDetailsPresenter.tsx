import useAuthStore from '@/store/AuthStore';
import { useNavigate, useParams } from 'react-router-dom';
import useProductDetailsStore from '@/store/ProductDetailsStore';
import ProductDetailsView from '@/components/view/ProductDetailsView';
import { useEffect } from 'react';
import { useCartItemsStore } from '@/store/CartItemsStore';

const ProductDetailsPresenter = () => {
    const { id } = useParams<{ id: string }>()
    const isAuth = useAuthStore((state) => state.isAuth);
    const status = useProductDetailsStore((state) => state.status)
    const productDetails = useProductDetailsStore((state) => state.productDetails)
    const addToCart = useProductDetailsStore((state) => state.addToCart)
    const cartItems = useCartItemsStore((state) => state.cartItems)
    const fetchProductDetails = useProductDetailsStore((state) => state.fetchProductDetails)
    const addCartItem = useCartItemsStore((state) => state.addCartItem)
    const navigate = useNavigate();


    useEffect(() => {
        console.log(id)
        if (id) {
            fetchProductDetails(id);
        }
    }, [id, cartItems]);

    const onAddToCart = (productId: string) => {
        console.log("Add " + productId)
        addCartItem(productId)
        addToCart()
    }

    const onReturn = () => {
        console.log("Return ")
        navigate(-1)
    }


    return (
        <ProductDetailsView status={status} productDetails={productDetails} isAuth={isAuth} onAddToCart={onAddToCart}
            onReturn={onReturn}>
        </ProductDetailsView>
    );
};

export default ProductDetailsPresenter;

