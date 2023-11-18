import { Button, Col, Row } from "react-bootstrap";
import { ItemsInterface } from "../../interfaces";

export default function ManageItems({
  items,
  handleShow,
  setItemToUpdate,
}: {
  items: ItemsInterface[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleShow: () => void;
  setItemToUpdate: React.Dispatch<
    React.SetStateAction<ItemsInterface | undefined>
  >;
}) {
  console.log("Items ", items);

  return (
    <Row>
      <Col>
        <h3>Manage All Items</h3>
        <ol type="1" key={"list"}>
          {items?.map((item) => (
            <div key={item.id} style={{ paddingBottom: "10px" }}>
              <li>{item.name}</li>
              <Button
                onClick={() => {
                  handleShow();
                  setItemToUpdate(item);
                }}
                type="button"
              >
                Manage
              </Button>
            </div>
          ))}
        </ol>
      </Col>
    </Row>
  );
}
