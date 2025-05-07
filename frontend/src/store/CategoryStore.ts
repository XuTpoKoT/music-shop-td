import { create } from "zustand";
import { persist } from "zustand/middleware";
import CategoriesApi from "@/api/CategoriesApi";
import { CategoryResponse, CategoryResponseSchema } from "../dto/CategoryResponse";
import { RequestStatus } from "@/dto/RequestState";
import { useErrorStore } from "./ErrorStore";
import { getServerErrorMessage } from "@/api";

interface CategoriesState {
    status: RequestStatus;
    categories: CategoryResponse[] | null;
    selectedCategoryId: string;
    setSelectedCategory: (categoryId: string) => void;
    fetchCategories: () => void;
}

const useCategoryStore = create<CategoriesState>()(
    persist(
        (set, get) => ({
            status: RequestStatus.Idle,
            categories: null,
            selectedCategoryId: '',
            setSelectedCategory: (categoryId) => set({ selectedCategoryId: categoryId }),
            fetchCategories: async () => {
                set({status: RequestStatus.Loading})
                try {
                    const response = await CategoriesApi.getCategories()
                    const validatedResponse = CategoryResponseSchema.array().parse(response)
                    set({ status: RequestStatus.Success, categories: validatedResponse });
                } catch (e) {
                    const errMsg = getServerErrorMessage(e)
                    console.log(errMsg)
                    set({ status: RequestStatus.Error, categories: null });
                    useErrorStore.setState({errorMessage: errMsg})
                }
            },
        }),
        {
            name: 'categories-storage',
            getStorage: () => sessionStorage,
        }
    )
);

export default useCategoryStore;