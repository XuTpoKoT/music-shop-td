import { create } from "zustand";
import { persist } from "zustand/middleware";
import OrdersApi from "@/api/OrdersApi";
import { Order, OrderSchema, Orders, OrdersSchema } from "@/dto/OrderResponse";
import { RequestStatus } from "@/dto/RequestState";
import { useErrorStore } from "./ErrorStore";
import { getServerErrorMessage } from "@/api";
import usePickupPointsStore from "./PickupPointsStore";
import { useCartItemsStore } from "./CartItemsStore";
import { useSuccessStore } from "./SuccessStore";

interface OrdersState {
  status: RequestStatus;
  orders: Orders | null;
  selectedOrder: Order | null;
  selectedPage: number;
  needSpendBonuses: boolean;
  customerId: number | null;
  orderIdForSearch: string,
  fetchOrders: () => Promise<void>;
  fetchOrderById: (orderId: string) => Promise<void>;
  setOrderIdForSearch: (newOrderIdForSearch: string) => void;
  createOrder: (navigate: (path: string) => void) => Promise<void>;
}

const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      status: RequestStatus.Idle,
      orders: null,
      selectedOrder: null,
      selectedPage: 1,
      needSpendBonuses: false,
      customerId: null,
      orderIdForSearch: '',
      setOrderIdForSearch: (newOrderIdForSearch) => set({ orderIdForSearch: newOrderIdForSearch }),
      fetchOrders: async () => {
        set({ status: RequestStatus.Loading });
        try {
          const login = localStorage.getItem('username') || ''
          const response = await OrdersApi.getOrders(login, get().selectedPage);
          const validatedResponse = OrdersSchema.parse(response);
          set({ status: RequestStatus.Success, orders: validatedResponse, selectedOrder: null });
        } catch (e) {
          const errMsg = getServerErrorMessage(e)
          console.log(errMsg)
          useErrorStore.setState({ errorMessage: errMsg });
          set({ status: RequestStatus.Error, orders: null });
        }
      },

      fetchOrderById: async (orderId) => {
        set({ status: RequestStatus.Loading });
        try {
          // const orderId = get().orderIdForSearch
          const response = await OrdersApi.getOrderById(orderId);
          const validatedResponse = OrderSchema.parse(response); 
          set({ status: RequestStatus.Success, selectedOrder: validatedResponse, orders: null });
        } catch (e) {
          const errMsg = getServerErrorMessage(e)
          console.log(errMsg)
          useErrorStore.setState({ errorMessage: errMsg });
          set({ status: RequestStatus.Error, selectedOrder: null });
        }
      },

      createOrder: async (navigate: (path: string) => void) => {
        set({ status: RequestStatus.Loading });
        try {
          const cartItems = useCartItemsStore.getState().cartItems
          if (!cartItems || cartItems.length == 0) {
            throw new Error('Корзина пуста!')
          }   
          const login = localStorage.getItem('username') || ''
          const body = {
            customerId: get().customerId!,
            pickUpPointId: usePickupPointsStore.getState().selectedPickUpPointId!,
            
          }
          await OrdersApi.createOrder(login, body);
          useCartItemsStore.getState().cleanCart()
          set({ status: RequestStatus.Success });
          useSuccessStore.setState({ msg: "Заказ успешно оформлен!" });
          navigate('/')
        } catch (e) {
          const errMsg = getServerErrorMessage(e);
          console.log(errMsg)
          useErrorStore.setState({ errorMessage: errMsg });
          set({ status: RequestStatus.Error });
        }
      },
    }),
    {
      name: "orders-storage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useOrdersStore;
