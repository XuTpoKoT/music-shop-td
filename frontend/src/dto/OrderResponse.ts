import { z } from "zod";

export const OrderSchema = z.object({
  id: z.number(),
  customerUsername: z.string(),
  timestamp: z.string().datetime(),
  status: z.string(),
  pickUpPointAddress: z.string(),
  cost: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;

export const OrdersSchema = z.object({
  totalPages: z.number(),
  currentPage: z.number(),
  content: z.array(OrderSchema).nullable(),
});

export type Orders = z.infer<typeof OrdersSchema>;
