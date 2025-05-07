import { create } from "zustand";
import { persist } from "zustand/middleware";
import ProductsApi from "@/api/ProductsApi";
import { ProductResponse, ProductResponseSchema } from "@/dto/ProductResponse";
import { RequestStatus } from "@/dto/RequestState";
import { useErrorStore } from "@/store//ErrorStore";
import { getServerErrorMessage } from "@/api";
import { getProductCount } from "./ProductPageStore";
import { useCartItemsStore } from "./CartItemsStore";

interface ProductDetailsState {
    status: RequestStatus;
    productDetails: ProductResponse | null;
    fetchProductDetails: (productId: string) => void;
    addToCart : () => void;
}

const useProductDetailsStore = create<ProductDetailsState>()(
    persist(
        (set, get) => ({
            status: RequestStatus.Idle,
            productDetails: null,
            addToCart: () => {
                var newProductDetails = get().productDetails
                if (newProductDetails) {
                    newProductDetails.count = 1
                }
                set({productDetails: newProductDetails})
            },
            fetchProductDetails: async (productId) => {
                set({status: RequestStatus.Loading})
                try {
                    const response = await ProductsApi.getProductById(productId);
                    var validatedResponse = ProductResponseSchema.parse(response)
                    const cartItems = useCartItemsStore.getState().cartItems
                    const cnt = getProductCount(validatedResponse.name, cartItems)
                    console.log("fetch cnt " + cnt)
                    if (cnt) {
                        validatedResponse.count = cnt
                    }
                    set({status: RequestStatus.Success, productDetails: validatedResponse})
                } catch (e) {                    
                    const errMsg = getServerErrorMessage(e)
                    console.log(errMsg)
                    set({status: RequestStatus.Error, productDetails: null})
                    useErrorStore.setState({errorMessage: errMsg})
                }
            },
        }),
        {
            name: 'product-details-storage',
            getStorage: () => sessionStorage,
        }
    )
);

export default useProductDetailsStore;