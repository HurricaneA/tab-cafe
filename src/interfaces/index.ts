export interface ItemsInterface {
  name: string;
  id: number;
  price: number;
  quantity: number;
  type: ItemType;
}

export type ItemType = "snacks" | "specials" | "beverages";

export interface OrdersInterface {
  description: string;
  quantity: number;
  name: string;
  unitPrice: number;
  total: number;
}

export interface GetOrdersInterface {
  id: number;
  orders: {
    name: string;
    quantity: string;
    unitPrice: string;
  }[];
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
