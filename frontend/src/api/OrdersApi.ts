import $api from "@/api";
import { Orders, Order } from "@/dto/OrderResponse";

export default class OrdersApi {
  static getOrders(login: string, pageNumber: number) {
    return $api
      .get<Orders>("/orders", {
        params: {
          login,
          pageNumber,
          pageSize: 5,
        },
      })
      .then(response => response.data);
  }

  static getOrderById(orderId: string) {
    return $api
      .get<Order>(`/orders/${orderId}`)
      .then(response => response.data);
  }

  static createOrder(
    login: string,
    body: {
      customerId?: number;
      pickup_point_id: number;
    }
  ) {
    return $api
      .post<void>("/orders", body, {
        params: {
          login,
        },
      })
      .then(response => response.data);
  }
}
