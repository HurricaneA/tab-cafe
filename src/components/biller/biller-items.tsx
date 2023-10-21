import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ItemsInterface } from "../../interfaces";

export default function BillerItems() {
  const baseURL = "https://p01--nestjs--dxhvkdzpb8bz.code.run";

  useEffect(() => {
    axios.get(`${baseURL}/items`).then((response) => {
      const items: ItemsInterface[] = response.data;
      const allItems = items.map((item) => ({ ...item, quantity: 0 }));
      setItems(allItems);
      setSnacks(allItems.filter((item) => item.type === "snacks"));
      setSpecials(allItems.filter((item) => item.type === "specials"));
      setBeverages(allItems.filter((item) => item.type === "beverages"));
    });
  }, []);

  const [items, setItems] = useState<ItemsInterface[]>([]);
  const [snacks, setSnacks] = useState<ItemsInterface[]>([]);
  const [specials, setSpecials] = useState<ItemsInterface[]>([]);
  const [beverages, setBeverages] = useState<ItemsInterface[]>([]);
  const [showOrder, setShowOrder] = useState(false);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState<string[]>([]);

  useEffect(() => {
    console.log(items);
    const handleTotal = () => {
      const sum = items.reduce(
        (result, { price, quantity }) => (result += price * quantity),
        0
      );

      setTotal(sum);
    };

    handleTotal();
    setSnacks(items.filter((item) => item.type === "snacks"));
    setSpecials(items.filter((item) => item.type === "specials"));
    setBeverages(items.filter((item) => item.type === "beverages"));

    const orderItems = items.filter((item) => item.quantity > 0);

    setOrder(orderItems.map((fl) => `${fl.quantity} X ${fl.name}`));

    return () => {
      handleTotal();
    };
  }, [items]);

  const handleChange = (
    itemId: number,
    e: React.ChangeEvent<FormControlElement>
  ) => {
    const newValue = Number(e.currentTarget.value);
    if (newValue >= 0) {
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === itemId
            ? { ...prevItem, quantity: newValue }
            : prevItem
        )
      );
    }
  };

  const placeOrder = (orders: string[]) => {
    console.log(orders);
  };

  return (
    <>
      <h2>Specials</h2>
      {specials.map((item) => (
        <div className="row" key={item.id}>
          <div className="col-4">
            <p>
              {item.name} - <b>{item.price}/=</b>
            </p>
          </div>
          <div className="col-8">
            <Form.Control
              type="number"
              id="inputquantity"
              defaultValue={item.quantity}
              onChange={(e) => handleChange(item.id, e)}
            />
          </div>
        </div>
      ))}

      <h2>Snacks</h2>
      {snacks.map((item) => (
        <div className="row" key={item.id}>
          <div className="col-4">
            <p>
              {item.name} - <b>{item.price}/=</b>
            </p>
          </div>
          <div className="col-8">
            <Form.Control
              type="number"
              id="inputquantity"
              defaultValue={item.quantity}
              onChange={(e) => handleChange(item.id, e)}
            />
          </div>
        </div>
      ))}

      <h2>Beverages</h2>
      {beverages.map((item) => (
        <div className="row" key={item.id}>
          <div className="col-4">
            <p>
              {item.name} - <b>{item.price}/=</b>
            </p>
          </div>
          <div className="col-8">
            <Form.Control
              type="number"
              id="inputquantity"
              defaultValue={item.quantity}
              onChange={(e) => handleChange(item.id, e)}
            />
          </div>
        </div>
      ))}

      <h3>
        {showOrder && order.map((item, index) => <p key={index}>{item}</p>)}
        <b>Price : {total}</b>
      </h3>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button variant="success" onClick={() => placeOrder(order)}>
          Place Order
        </Button>
        <br />
        <Button
          variant="secondary"
          onClick={() => setShowOrder((prevState) => !prevState)}
        >
          {showOrder ? "Hide Orders" : "Show Order"}
        </Button>
      </div>
    </>
  );
}
