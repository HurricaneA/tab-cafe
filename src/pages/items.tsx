import { useState } from "react";
import EditItem from "../components/items/EditItem";
import ManageItems from "../components/items/ManageItems";
import { ItemsInterface } from "../interfaces";

export default function Items() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [itemToUpdate, setItemToUpdate] = useState<ItemsInterface>();

  return (
    <div>
      <EditItem show={show} setShow={setShow} itemToUpdate={itemToUpdate} />
      <ManageItems handleShow={handleShow} setItemToUpdate={setItemToUpdate} />
    </div>
  );
}
