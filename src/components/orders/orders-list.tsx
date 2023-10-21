import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { GetOrdersInterface } from "../../interfaces";
import moment from "moment";

export default function OrdersList() {
  const baseURL = "https://p01--nestjs--dxhvkdzpb8bz.code.run";
  // type Views = "all" | "pending" | "completed";
  // const baseURL = "http://localhost:3000";
  // const [defaultOrdersList, setDefaultOrdersList] = useState<
  //   GetOrdersInterface[]
  // >([]);
  const [ordersList, setOrdersList] = useState<GetOrdersInterface[]>([]);
  // const [view, setView] = useState<Views>("all");

  useEffect(() => {
    axios.get(`${baseURL}/orders`).then((response) => {
      const fetchedOrders: GetOrdersInterface[] = response.data;
      // setDefaultOrdersList(fetchedOrders);
      setOrdersList(fetchedOrders.filter((item) => !item.isCompleted));
    });
  }, []);

  // const handleViewChange = (view: Views) => {
  //   if (view === "all") {
  //     setOrdersList(defaultOrdersList);
  //   } else if (view === "pending") {
  //     setOrdersList(defaultOrdersList.filter((item) => !item.isCompleted));
  //   } else {
  //     setOrdersList(defaultOrdersList.filter((item) => item.isCompleted));
  //   }

  //   setView(view);
  // };

  const updateCompleteStatus = (id: number) => {
    axios
      .patch(`${baseURL}/orders/${id}`)
      .then((result) => {
        if (result.status !== 201) {
          alert("Cannot change status");
        } else {
          setOrdersList((prevItems) =>
            prevItems.map((prevItem) =>
              prevItem.id === id
                ? { ...prevItem, isCompleted: !prevItem.isCompleted }
                : prevItem
            )
          );
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Row>
      <Col>
        <div>
          <h2>Pending Orders</h2>
          <br />
          {/* <Form.Select
            placeholder="type"
            name="filterby"
            onChange={(e) => handleViewChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </Form.Select> */}
          <br />
        </div>
        {ordersList.map((orderList, index) => (
          <div key={index}>
            <div className="row">
              <div className="col-12">
                <h4>Order {index + 1}</h4>
                <h6 style={{ fontWeight: "lighter" }}>
                  placed {`${moment(orderList.createdAt.toString()).fromNow()}`}
                </h6>
                <ol key={index} type="1">
                  {orderList.orders.map((order, indexTwo) => (
                    <li key={indexTwo}>
                      {order.name} X {order.quantity}
                    </li>
                  ))}
                </ol>
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  variant={orderList.isCompleted ? "success" : "warning"}
                  onClick={() => updateCompleteStatus(orderList.id)}
                >
                  {orderList.isCompleted ? "Marked as Competed" : "Pending"}
                </Button>
              </div>
            </div>
            <br />
            <br />
          </div>
        ))}
      </Col>
    </Row>
  );
}
