import React, { useEffect, useState } from 'react';
import useCategoryStore from '@/store/CategoryStore';
import FiltersView from '@/components/view/FiltersView';
import { useSearchParams } from 'react-router-dom';
import useManufacturerStore from '@/store/ManufacturersStore';

const FiltersPresenter = () => {
  const categories = useCategoryStore((state) => state.categories);
  const status = useCategoryStore((state) => state.status);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const manufacturers = useManufacturerStore((state) => state.manufacturers);
  const fetchManufacturers = useManufacturerStore((state) => state.fetchManufacturers);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get("categoryId") || undefined;
  const selectedManufacturers = searchParams.getAll("manufacturer");

  useEffect(() => {
    fetchCategories();
    fetchManufacturers();
  }, [fetchCategories, fetchManufacturers]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCategoryId = event.target.value;
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete('productPrefix');
    updatedParams.delete('pageNumber');

    if (selectedCategoryId) {
      updatedParams.set("categoryId", selectedCategoryId);
    } else {
      updatedParams.delete("categoryId");
    }

    setSearchParams(updatedParams);
  };

  const handleManufacturerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const manufacturer = event.target.value;
    const isChecked = event.target.checked;

    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete('pageNumber');

    const currentManufacturers = new Set(updatedParams.getAll("manufacturer"));

    if (isChecked) {
      currentManufacturers.add(manufacturer);
    } else {
      currentManufacturers.delete(manufacturer);
    }

    // Удаляем старые
    updatedParams.delete("manufacturer");
    // Добавляем заново
    for (const m of currentManufacturers) {
      updatedParams.append("manufacturer", m);
    }

    setSearchParams(updatedParams);
  };

  return (
    <FiltersView
      status={status}
      categories={categories}
      selectedCategoryId={selectedCategoryId}
      handleCategoryChange={handleCategoryChange}
      manufacturers={manufacturers}
      selectedManufacturers={selectedManufacturers}
      handleManufacturerChange={handleManufacturerChange}
    />
  );
};

export default FiltersPresenter;
