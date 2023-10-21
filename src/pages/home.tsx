import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddItem from "../components/biller/add-item";
import BillerItems from "../components/biller/biller-items";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <br></br>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          onClick={() => setShowMenu((prevState) => !prevState)}
          style={{ textAlign: "end" }}
        >
          Menu
        </Button>
        <Button
          onClick={() => navigate("items")}
          style={{ textAlign: "end" }}
          variant="warning"
        >
          Items
        </Button>
        <Button
          variant="dark"
          onClick={() => navigate("orders")}
          style={{ textAlign: "end" }}
        >
          Orders
        </Button>
      </div>
      {showMenu && (
        <>
          <br />
          <AddItem />
        </>
      )}
      <br />
      <BillerItems />
    </div>
  );
}
