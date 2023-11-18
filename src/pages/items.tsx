import { useEffect, useState } from "react";
import EditItem from "../components/items/EditItem";
import ManageItems from "../components/items/ManageItems";
import { ItemsInterface } from "../interfaces";
import { useItems } from "../api/queries";

export const Items = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [itemToUpdate, setItemToUpdate] = useState<ItemsInterface>();

  const [items, setItems] = useState<ItemsInterface[]>([]);

  const { data, isLoading, error } = useItems();

  useEffect(() => {
    setItems(data ?? []);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + (error as any)?.message;

  return (
    <div>
      <EditItem show={show} setShow={setShow} itemToUpdate={itemToUpdate} />
      <ManageItems
        handleShow={handleShow}
        setItemToUpdate={setItemToUpdate}
        items={items}
      />
    </div>
  );
};
