import { useEffect, useState } from "react";
import { useOrders } from "../api/queries";
import { GetOrdersInterface } from "../interfaces";

export const Stats = () => {
  const [ordersList, setOrdersList] = useState<GetOrdersInterface[]>([]);

  const { data: ordersData, isLoading, error } = useOrders();

  useEffect(() => {
    setOrdersList(ordersData ?? []);
  }, [ordersData]);

  const total = ordersList
    .map((item) => item.total)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  if (isLoading) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + (error as any)?.message;
  return <div>Total Sales: {total} LKR</div>;
};
