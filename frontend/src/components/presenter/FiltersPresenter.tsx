import React, { useEffect } from 'react';
import useCategoryStore from '@/store/CategoryStore';
import FiltersView from '@/components/view/FiltersView';
import { useSearchParams } from 'react-router-dom';

const FiltersPresenter = () => {
    const categories = useCategoryStore((state) => state.categories)
    const status = useCategoryStore((state) => state.status)
    const fetchCategories = useCategoryStore((state) => state.fetchCategories)
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCategoryId = searchParams.get("categoryId") || undefined;

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedCategoryId = event.target.value;
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('productPrefix')
        updatedParams.delete('pageNumber')
        if (selectedCategoryId) {
            updatedParams.set("categoryId", selectedCategoryId);
        } else {
            updatedParams.delete('categoryId')
        }
        setSearchParams(updatedParams);
    };

    return (
        <FiltersView
            status={status}
            categories={categories}
            handleCategoryChange={handleCategoryChange}
            selectedCategoryId={selectedCategoryId}
        />
    );
    
};

export default FiltersPresenter;
