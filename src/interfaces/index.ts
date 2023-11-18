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

export interface OrderToPlaceInterface {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface GetOrdersInterface {
  id: number;
  orders: Order[];
  isCompleted: boolean;
  randomId: string;
  receiptLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceInterface {
  id: string;
  invoice_no: string;
  balance: string;
  company: string;
  address: string;
  items: Order[];
  transDate: string;
}
