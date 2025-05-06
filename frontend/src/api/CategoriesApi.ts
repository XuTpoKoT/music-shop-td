import $api from ".";
import { CategoryResponse } from "../dto/CategoryResponse";

export default class CategoriesApi {

    static async getCategories() {
        return await $api.get<CategoryResponse[]>('/categories')
            .then(response => response.data)
    }
}

