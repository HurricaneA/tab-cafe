import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { GetOrdersInterface, InvoiceInterface } from "../../interfaces";
import moment from "moment";
import { baseUrl } from "../../util/constants";
import { getOrders } from "../../api";
import { useQuery } from "react-query";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Template } from "../pdf/template";
import { Invoice } from "../pdf/Invoice";

export default function OrdersList() {
  const [ordersList, setOrdersList] = useState<GetOrdersInterface[]>([]);

  const [pdfData, setPdfData] = useState<InvoiceInterface>();

  const generatePDF = (orderList: GetOrdersInterface) => {
    const balance = orderList.orders
      .map((item) => Number(item.quantity) * item.unitPrice)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const invoice: InvoiceInterface = {
      address: "Colombo Gospel Tabernacle",
      balance: balance.toString(),
      id: orderList.randomId,
      invoice_no: orderList.randomId,
      company: "Tab Cafe",
      items: orderList.orders,
      transDate: new Date().toLocaleDateString(),
    };

    setPdfData(invoice);
  };

  const {
    data: ordersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ordersData"],
    queryFn: () => getOrders(),
  });

  useEffect(() => {
    setOrdersList(ordersData ?? []);
  }, [ordersData]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + (error as any)?.message;

  // const updateCompleteStatus = (id: number) => {
  //   axios
  //     .patch(`${baseUrl}/orders/${id}`)
  //     .then((result) => {
  //       if (result.status !== 201) {
  //         alert("Cannot change status");
  //       } else {
  //         setOrdersList((prevItems) =>
  //           prevItems.map((prevItem) =>
  //             prevItem.id === id
  //               ? { ...prevItem, isCompleted: !prevItem.isCompleted }
  //               : prevItem
  //           )
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  return (
    <Row>
      <Col>
        <div>
          <h2>Total Orders</h2>
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
                  {orderList.orders.map((order, indexTwo) =>
                    order.name.toLowerCase().includes("juice") ? (
                      <li key={indexTwo} style={{ color: "red" }}>
                        {order.name} X {order.quantity}
                      </li>
                    ) : (
                      <li key={indexTwo}>
                        {order.name} X {order.quantity}
                      </li>
                    )
                  )}
                </ol>
              </div>
              <div style={{ textAlign: "center" }}>
                {/* <Button
                  variant={orderList.isCompleted ? "success" : "warning"}
                  onClick={() => updateCompleteStatus(orderList.id)}
                >
                  {orderList.isCompleted ? "Marked as Competed" : "Pending"}
                </Button> */}
                <Button
                  onClick={() => generatePDF(orderList)}
                  variant={"warning"}
                >
                  Generate PDF
                </Button>

                {pdfData && (
                  <PDFDownloadLink
                    document={<Invoice invoice={pdfData} />}
                    fileName="somename.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Loading document..." : "Download now!"
                    }
                  </PDFDownloadLink>
                )}
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
