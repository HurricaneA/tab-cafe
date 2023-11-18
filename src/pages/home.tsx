import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { placeOrder } from "../api";
import { useItems } from "../api/queries";
import BillerItems from "../components/biller/BillerItems";
import { ItemsInterface } from "../interfaces";

export const Home = () => {
  const [fetchedData, setFetchData] = useState<ItemsInterface[]>([]);

  const { data: itemsData, isLoading, error } = useItems();
  const { mutateAsync: placeOrderMutation } = useMutation({
    mutationFn: placeOrder,
  });

  useEffect(() => {
    setFetchData(itemsData ?? []);
  }, [itemsData]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + (error as any)?.message;
  return (
    <div>
      <BillerItems
        fetchedData={fetchedData}
        setFetchData={setFetchData}
        placeOrderMutation={placeOrderMutation}
      />
    </div>
  );
};
