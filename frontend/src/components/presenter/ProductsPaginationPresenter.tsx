import useProductPageStore from "@/store/ProductPageStore";
import PaginationView from '@/components/view/PaginationView';
import { useSearchParams } from "react-router-dom";

const ProductsPaginationPresenter = () => {
    const productPage = useProductPageStore((state) => state.productPage)
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedPage = searchParams.get("pageNumber")
        ? parseInt(searchParams.get("pageNumber")!, 10)
        : 1;

    const handlePageChange = (newPage: number) => {
        console.log("Set Page " + newPage)
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.set("pageNumber", newPage.toString());
        setSearchParams(updatedParams);
    };

    return (
        <PaginationView currentPage={selectedPage} totalPages={productPage?.totalPages} 
                handlePageChange={handlePageChange}></PaginationView>
    );
};

export default ProductsPaginationPresenter;

