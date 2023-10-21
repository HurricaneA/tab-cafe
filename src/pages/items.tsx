import { useState } from "react";
import EditItem from "../components/items/edit-item";
import ManageItems from "../components/items/manage-items";
import { ItemsInterface } from "../interfaces";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Items() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [itemToUpdate, setItemToUpdate] = useState<ItemsInterface>();
  const navigate = useNavigate();

  return (
    <div>
      <br></br>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          onClick={() => navigate("/")}
          style={{ textAlign: "end" }}
          variant="warning"
        >
          Home
        </Button>
        <Button
          variant="dark"
          onClick={() => navigate("/orders")}
          style={{ textAlign: "end" }}
        >
          Orders
        </Button>
      </div>
      <EditItem show={show} setShow={setShow} itemToUpdate={itemToUpdate} />
      <ManageItems handleShow={handleShow} setItemToUpdate={setItemToUpdate} />
    </div>
  );
}
