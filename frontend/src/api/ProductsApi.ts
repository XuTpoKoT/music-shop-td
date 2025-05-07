import { ProductPageResponse } from "../dto/ProductPageResponse";
import { ProductResponse } from "../dto/ProductResponse";
import $api from "./index";

export default class ProductsApi {
    static async getProducts(
        categoryId?: string,
        productPrefix?: string,
        pageNumber?: number,
        min_price?: number,
        max_price?: number,
        manufacturers?: number[]
    ) {
        return await $api.get<ProductPageResponse>('/products', {
                params: {
                    pageSize: 12,
                    ...(categoryId ? { categoryId } : {}),
                    ...(productPrefix ? { productPrefix } : {}),
                    ...(pageNumber ? { pageNumber } : { pageNumber: 1}),
                    ...(min_price ? { min_price } : { min_price: 1}),
                    ...(max_price ? { max_price } : { max_price: 99999}),
                    ...(manufacturers ? { manufacturers } : {}),
                },
                paramsSerializer: {
                    indexes: null // ← важно: чтобы Axios не добавлял `manufacturers[0]=...`
                }
            })
            .then((response) => response.data)
    }

    static async getProductById(productId: string) {
        return await $api.get<ProductResponse>(`/products/` + productId)
            .then((response) => response.data)
    }
}

