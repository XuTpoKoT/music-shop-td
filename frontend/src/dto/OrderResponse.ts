import { z } from "zod";

export const OrderSchema = z.object({
  id: z.string(),
  customerUsername: z.string(),
  timestamp: z.string().datetime(),
  status: z.string(),
  pickUpPointAddress: z.string(),
  initialCost: z.number(),
  paidByBonuses: z.number(),
});

export type Order = z.infer<typeof OrderSchema>;

export const OrdersSchema = z.object({
  totalPages: z.number(),
  currentPage: z.number(),
  content: z.array(OrderSchema).nullable(),
});

export type Orders = z.infer<typeof OrdersSchema>;
