import useProductPageStore from "@/store/ProductPageStore";
import SearchBarView from '@/components/view/SearchBarView';
import { useSearchParams } from "react-router-dom";

const ProductsSearchBarPresenter = () => {
    const setProductPrefix = useProductPageStore((state) => state.setProductPrefix)
    const searchQuery = useProductPageStore((state) => state.productPrefix)
    const [searchParams, setSearchParams] = useSearchParams();
    // const productPrefix = searchParams.get("productPrefix") || undefined;
    var value = searchQuery || "";

    const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Set ProductPrefix " + e.target.value)
        setProductPrefix(e.target.value)
    };

    const handleSubmitSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("handleSubmitSearch")
        const updatedParams = new URLSearchParams(searchParams);
        const newPrefix = useProductPageStore.getState().productPrefix
        updatedParams.set("productPrefix", newPrefix);
        setSearchParams(updatedParams);
    };

    const label = "Введите название товара"
    return (
        <SearchBarView handleInputChange={handleChangeSearchQuery} handleSubmit={handleSubmitSearch}
        value={value} label={label}></SearchBarView>
    );
};

export default ProductsSearchBarPresenter;

