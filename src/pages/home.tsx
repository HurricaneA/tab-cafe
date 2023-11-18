import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getItems, placeOrder } from "../api";
import BillerItems from "../components/biller/BillerItems";
import { ItemsInterface } from "../interfaces";

export default function Home() {
  const [fetchedData, setFetchData] = useState<ItemsInterface[]>([]);

  const {
    data: itemsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["itemsData"],
    queryFn: () => getItems(),
  });

  const { mutateAsync: placeOrderMutation } = useMutation({
    mutationFn: placeOrder,
  });

  useEffect(() => {
    console.log("Running now");
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
}
