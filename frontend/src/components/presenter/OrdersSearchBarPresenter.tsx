import SearchBarView from '@/components/view/SearchBarView';
import useOrdersStore from "@/store/OrdersStore";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const OrdersSearchBarPresenter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const setOrderIdForSearch = useOrdersStore((state) => state.setOrderIdForSearch)
    // const fetchOrderById = useOrdersStore((state) => state.fetchOrderById)
    const orderIdForSearch = useOrdersStore((state) => state.orderIdForSearch)
    // const { id } = useParams<{ id: string }>()
    var value = orderIdForSearch || "";
    // const navigate = useNavigate()

    const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Set orderIdForSearch " + e.target.value)
        setOrderIdForSearch(e.target.value)
    };

    const handleSubmitSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("handleSubmitSearch")
        const updatedParams = new URLSearchParams(searchParams);
        const orderIdForSearch = useOrdersStore.getState().orderIdForSearch
        updatedParams.set("orderIdForSearch", orderIdForSearch);
        setSearchParams(updatedParams);
        // navigate('/orders/' + orderIdForSearch)
    };

    const label = "Введите id заказа"
    return (
        <SearchBarView handleInputChange={handleChangeSearchQuery} handleSubmit={handleSubmitSearch}
        value={value} label={label}></SearchBarView>
    );
};

export default OrdersSearchBarPresenter;

