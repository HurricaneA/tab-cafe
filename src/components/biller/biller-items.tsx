import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ItemsInterface, OrdersInterface } from "../../interfaces";

export default function BillerItems() {
  const baseURL = "https://p01--nestjs--dxhvkdzpb8bz.code.run";
  // const baseURL = "http://localhost:3000";

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
  const [showOrder, setShowOrder] = useState(true);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState<OrdersInterface[]>([]);

  useEffect(() => {
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

    setOrder(
      orderItems.map((fl) => ({
        description: `${fl.quantity} X ${fl.name} = ${fl.quantity} X ${fl.price} ----> `,
        quantity: fl.quantity,
        name: fl.name,
        unitPrice: fl.price,
        total: fl.price * fl.quantity,
      }))
    );

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

  const resetOrder = () => {
    setItems(items.map((item) => ({ ...item, quantity: 0 })));
  };

  const placeOrder = (orders: OrdersInterface[]) => {
    if (orders.length !== 0) {
      const data = {
        items: orders.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      };

      axios
        .post(`${baseURL}/orders`, data)
        .then((result) => {
          if (result.status === 200) {
            alert("Order placed!");
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
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
              min={1}
              value={item.quantity}
              id="inputquantity"
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
              min={1}
              value={item.quantity}
              id="inputquantity"
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
              min={1}
              value={item.quantity}
              id="inputquantity"
              onChange={(e) => handleChange(item.id, e)}
            />
          </div>
        </div>
      ))}

      {showOrder && (
        <>
          <h4>Your Order</h4>
          {order.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p key={index}>{item.description}</p>
              <h5>{item.total}LKR</h5>
            </div>
          ))}
        </>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="button"
          variant="secondary"
          disabled={total === 0}
          onClick={resetOrder}
        >
          Clear Order
        </Button>
        <h5>
          <b>Price : {total}LKR</b>
        </h5>
      </div>

      <br />

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
