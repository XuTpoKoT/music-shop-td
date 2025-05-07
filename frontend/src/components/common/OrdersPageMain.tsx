import {Box} from "@mui/material";
import { useEffect } from "react";
import useOrdersStore from "@/store/OrdersStore";
import { OrdersPageMainStyle } from "@/style/OrdersStyle";
import OrdersPageMainView from "@/components/view/OrdersPageMainView";
import PaginationView from "@/components/view/PaginationView";
import OrdersSearchBarPresenter from "@/components/presenter/OrdersSearchBarPresenter";
import { useSearchParams } from "react-router-dom";

const OrdersPageMain = () => {
    console.log("Render OrdersPageMain")
    const orders = useOrdersStore(((state) => state.orders))
    const selectedOrder = useOrdersStore(((state) => state.selectedOrder))
    const status = useOrdersStore(((state) => state.status))
    const fetchOrders = useOrdersStore((state) => state.fetchOrders)
    const selectedPage = useOrdersStore.getState().selectedPage
    const fetchOrderById = useOrdersStore((state) => state.fetchOrderById)
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("orderIdForSearch")) {
            fetchOrderById(searchParams.get("orderIdForSearch")!)
        } else {
            fetchOrders()
        }
    }, [fetchOrders, searchParams]);

    const handlePageChange = (newPage: number) => {
        console.log("Set Page " + newPage)
        useOrdersStore.getState().selectedPage = newPage
        useOrdersStore.getState().fetchOrders()
    };

    return (
        <Box sx={OrdersPageMainStyle}>
            {/* <OrdersSearchBarPresenter></OrdersSearchBarPresenter> */}
            <OrdersPageMainView status={status} orders={orders!} selectedOrder={selectedOrder}></OrdersPageMainView>
            <PaginationView currentPage={selectedPage} totalPages={orders?.totalPages} 
                handlePageChange={handlePageChange}></PaginationView>
        </Box>
    )
}

export default OrdersPageMain;
