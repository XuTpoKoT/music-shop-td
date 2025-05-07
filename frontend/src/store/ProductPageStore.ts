import { create } from "zustand";
import { persist } from "zustand/middleware";
import ProductsApi from "@/api/ProductsApi";
import { ProductPageResponse, ProductPageResponseSchema } from "@/dto/ProductPageResponse";
import { RequestStatus } from "@/dto/RequestState";
import { useErrorStore } from "./ErrorStore";
import { getServerErrorMessage } from "@/api";
import { useCartItemsStore } from "@/store/CartItemsStore";
import { CartItemResponse } from "@/dto/CartItemResponse ";
import { ProductResponse } from "@/dto/ProductResponse";

interface ProductPageState {
    status: RequestStatus;
    productPage: ProductPageResponse | null;
    selectedPage: number;
    productPrefix: string;
    setSelectedPage: (pageNumber: number) => void;
    setProductPrefix: (productPrefix: string) => void;
    fetchProductPage: (categoryId?: string, productPrefix?: string, pageNumber?: number) => void;
    addToCart: (productId: string) => void;
}

export const getProductCount = (name: string, cartItems: CartItemResponse[] | null) => {
    if (!cartItems) {
        return null;
    }
    for (const ci of cartItems) {
        if (name === ci.name) {
            return ci.count;
        }
    }
    return null;
}

const useProductPageStore = create<ProductPageState>()(
    persist(
        (set, get) => ({
            status: RequestStatus.Idle,
            productPage: null,
            selectedPage: 1,
            productPrefix: '',
            addToCart: (productId: string) => {
                var products = get().productPage?.content!
                const pages = get().productPage?.totalPages!
                const currentPage = get().productPage?.currentPage!
                const productsWithCount = products.map(p => {
                    if (productId === p.id) {
                        p.count = 1
                    }
                    return p;
                })
                set({ productPage: {totalPages: pages, currentPage: currentPage, content: productsWithCount} })
            },
            setSelectedPage: (pageNumber) => set({ selectedPage: pageNumber }),
            setProductPrefix: (newProductPrefix) => set({ productPrefix: newProductPrefix }),
            fetchProductPage: async (categoryId, productPrefix?: string, pageNumber?: number) => {
                set({status: RequestStatus.Loading})
                try {
                    const response = await ProductsApi.getProducts(categoryId, productPrefix, pageNumber)
                    var validatedResponse = ProductPageResponseSchema.parse(response)
                    const cartItems = useCartItemsStore.getState().cartItems
                    const productsWithCount = validatedResponse.content?.map(p => {
                        const cnt = getProductCount(p.name, cartItems)
                        if (!cnt) {
                            return p;
                        }
                        p.count = cnt;
                        return p;
                    })
                    validatedResponse.content = productsWithCount || null
                    set({ status: RequestStatus.Success, productPage: validatedResponse });
                } catch (e) {
                    const errMsg = getServerErrorMessage(e)
                    console.log(errMsg)
                    set({ status: RequestStatus.Error, productPage: null });
                    useErrorStore.setState({errorMessage: errMsg})
                }
            },
        }),
        {
            name: 'product-storage',
            getStorage: () => sessionStorage,
        }
    )
);

export default useProductPageStore;

