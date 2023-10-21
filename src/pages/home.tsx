import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddItem from "../components/biller/add-item";
import BillerItems from "../components/biller/biller-items";

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <br></br>
      <Button
        onClick={() => setShowMenu((prevState) => !prevState)}
        style={{ textAlign: "end" }}
      >
        Menu
      </Button>
      {showMenu && <AddItem />}
      <br />
      <BillerItems />
    </div>
  );
}
