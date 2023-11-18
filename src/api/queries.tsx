import { useQuery } from "react-query";
import { getItems, getOrders } from ".";

export const useOrders = () => useQuery(["ordersData"], getOrders);
export const useItems = () => useQuery(["itemsData"], getItems);
