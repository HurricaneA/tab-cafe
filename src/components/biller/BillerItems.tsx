import { groupBy } from "lodash";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ItemsInterface, OrdersInterface } from "../../interfaces";
import { ListItemByType } from "./ListItemsByType";
import { UseMutateAsyncFunction } from "react-query";
import AddItem from "./AddItems";

export default function BillerItems({
  fetchedData,
  setFetchData,
  placeOrderMutation,
}: {
  fetchedData: ItemsInterface[];
  setFetchData: React.Dispatch<React.SetStateAction<ItemsInterface[]>>;
  placeOrderMutation: UseMutateAsyncFunction<
    void,
    unknown,
    OrdersInterface[],
    unknown
  >;
}) {
  const [snacks, setSnacks] = useState<ItemsInterface[]>([]);
  const [specials, setSpecials] = useState<ItemsInterface[]>([]);
  const [beverages, setBeverages] = useState<ItemsInterface[]>([]);
  const [showOrder, setShowOrder] = useState(true);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState<OrdersInterface[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleChange = (itemId: number, e: React.ChangeEvent<any>) => {
    const newValue = Number(e.currentTarget.value);
    if (newValue >= 0) {
      setFetchData((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === itemId
            ? { ...prevItem, quantity: newValue }
            : prevItem
        )
      );
    }
  };

  const resetOrder = () => {
    setFetchData(fetchedData.map((item) => ({ ...item, quantity: 0 })));
  };

  useEffect(() => {
    const handleTotal = () => {
      const sum = fetchedData.reduce(
        (result, { price, quantity }) => (result += price * quantity),
        0
      );

      setTotal(sum);
    };

    handleTotal();

    const groupedByType = groupBy(fetchedData, "type");
    setSnacks(groupedByType["snacks"]);
    setSpecials(groupedByType["specials"]);
    setBeverages(groupedByType["beverages"]);
    const orderItems = fetchedData.filter((item) => item.quantity > 0);

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
  }, [fetchedData]);

  return (
    <div className="my-2">
      <Button
        onClick={() => setShowMenu((prevState) => !prevState)}
        style={{ textAlign: "end" }}
      >
        Add New Item
      </Button>
      {showMenu && (
        <div>
          <br />
          <br />
          <AddItem />
        </div>
      )}

      <div className="my-3">
        <ListItemByType handleChange={handleChange} items={specials} />
        <ListItemByType handleChange={handleChange} items={snacks} />
        <ListItemByType handleChange={handleChange} items={beverages} />

        {showOrder && (
          <>
            <h4>Your Order</h4>
            {order.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p key={index}>{item.description}</p>
                <h5>{item.total}LKR</h5>
              </div>
            ))}
          </>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
          <Button
            variant="success"
            onClick={async () => {
              try {
                await placeOrderMutation(order);
                setOrder([]);
                resetOrder();
              } catch (error) {
                console.log(error);
              }
            }}
          >
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
      </div>
    </div>
  );
}
