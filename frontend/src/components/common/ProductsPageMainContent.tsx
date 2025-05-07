import { useEffect } from 'react';
import useProductPageStore from "@/store/ProductPageStore";
import { Box } from '@mui/material';
import { ProductsContentStyle } from '@/style/style';
import ProductsSearchBarPresenter from '@/components/presenter/ProductsSearchBarPresenter';
import ProductsGridPresenter from '@/components/presenter/ProductsGridPresenter';
import ProductsPaginationPresenter from '@/components/presenter/ProductsPaginationPresenter';
import { useSearchParams } from 'react-router-dom';

export const ProductsPageMainContent = () => {
    const fetchProductPage = useProductPageStore((state) => state.fetchProductPage)
    const setProductPrefix = useProductPageStore((state) => state.setProductPrefix)
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const selectedCategoryId =  searchParams.get("categoryId") || undefined;
        const productPrefix = searchParams.get("productPrefix") || undefined;
        const pageNumber = searchParams.get("pageNumber")
            ? parseInt(searchParams.get("pageNumber")!, 10)
            : undefined;
        const minPrice = searchParams.get("minPrice")
            ? parseInt(searchParams.get("minPrice")!, 10)
            : undefined;
        const maxPrice = searchParams.get("maxPrice")
            ? parseInt(searchParams.get("maxPrice")!, 10)
            : undefined;
        const manufacturers = searchParams.get("manufacturers") || undefined;

        console.log("Main pref", productPrefix, "Page", pageNumber);
        setProductPrefix(productPrefix!)
        fetchProductPage(selectedCategoryId, productPrefix, pageNumber)
    }, [fetchProductPage, searchParams]);

    return (
        <Box sx={ProductsContentStyle}>
            <ProductsSearchBarPresenter/>
            <ProductsGridPresenter />
            <ProductsPaginationPresenter />
        </Box>
    );
};

