import axios, { AxiosResponse } from "axios";
import {
  GetOrdersInterface,
  ItemsInterface,
  OrdersInterface,
} from "../interfaces";
import { baseUrl } from "../util/constants";

export const getItems = async (): Promise<ItemsInterface[]> => {
  return await axios
    .get(`${baseUrl}/items`)
    .then((response: AxiosResponse<ItemsInterface[]>) =>
      response.data.map((item) => ({ ...item, quantity: 0 }))
    );
};

export const placeOrder = async (order: OrdersInterface[]) => {
  console.log(order);

  const data = {
    items: order,
  };
  await axios
    .post(`${baseUrl}/orders`, data)
    .then((result) => result.data)
    .catch((err) => {
      alert(err);
    });
};

export const getOrders = async (): Promise<GetOrdersInterface[]> => {
  return await axios
    .get(`${baseUrl}/orders`)
    .then((response: AxiosResponse<GetOrdersInterface[]>) =>
      response.data.map((item) => ({ ...item, quantity: 0 }))
    );
};
