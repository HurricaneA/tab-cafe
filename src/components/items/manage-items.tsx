import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ItemsInterface } from "../../interfaces";

export default function ManageItems({
  handleShow,
  setItemToUpdate,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleShow: () => void;
  setItemToUpdate: React.Dispatch<React.SetStateAction<ItemsInterface>>;
}) {
  const baseURL = "https://p01--nestjs--dxhvkdzpb8bz.code.run";
  //   const baseURL = "http://localhost:3000";

  const [items, setItems] = useState<ItemsInterface[]>([]);

  useEffect(() => {
    axios.get(`${baseURL}/items`).then((response) => {
      const items: ItemsInterface[] = response.data;
      const allItems = items.map((item) => ({ ...item }));
      setItems(allItems);
    });
  }, []);

  return (
    <Row>
      <Col>
        <h3>Manage All Items</h3>
        <ol type="1" key={"list"}>
          {items.map((item) => (
            <div key={item.id} style={{ paddingBottom: "10px" }}>
              <li>{item.name}</li>
              <Button
                onClick={() => {
                  handleShow();
                  setItemToUpdate(item);
                }}
                type="button"
              >
                Manange
              </Button>
            </div>
          ))}
        </ol>
      </Col>
    </Row>
  );
}
