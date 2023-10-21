import React from "react";
import OrdersList from "../components/orders/orders-list";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Orders() {
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
          onClick={() => navigate("/items")}
          style={{ textAlign: "end" }}
        >
          Items
        </Button>
      </div>
      <OrdersList />
    </div>
  );
}
