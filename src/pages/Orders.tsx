import ReactPDF from "@react-pdf/renderer";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { uploadPDF, getOrders } from "../api";
import { Invoice } from "../components/pdf/Invoice";
import { GetOrdersInterface, InvoiceInterface } from "../interfaces";
import { useOrders } from "../api/queries";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { Loader } from "../components/common/Loader";
export const Orders = () => {
  const [ordersList, setOrdersList] = useState<GetOrdersInterface[]>([]);
  const [loader, setLoader] = useState(false);

  const generatePDF = async (orderList: GetOrdersInterface) => {
    setLoader(true);

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

    const pdf = await ReactPDF.pdf(<Invoice invoice={invoice} />).toBlob();

    const data = await uploadPDF(pdf, invoice.invoice_no, orderList.id);
    if (data) {
      console.log("data is ", data);
      setLoader(false);
      setOrdersList((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === orderList.id
            ? { ...prevItem, receiptLink: data.downloadLink }
            : prevItem
        )
      );
    }
  };

  const { data: ordersData, isLoading, error } = useOrders();

  useEffect(() => {
    setOrdersList(ordersData ?? []);
  }, [ordersData]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + (error as any)?.message;

  return (
    <Row>
      <Col>
        <div>
          <h2>Total Orders</h2>
          <br />
        </div>
        {loader ? (
          <Loader />
        ) : (
          <>
            {" "}
            {ordersList.map((orderList, index) => (
              <div key={index}>
                <div className="row">
                  <div className="col-12">
                    <h4>Order {ordersList.length - index}</h4>
                    <h6 style={{ fontWeight: "lighter" }}>
                      placed{" "}
                      {`${moment(orderList.createdAt.toString()).fromNow()}`}
                    </h6>
                    <ol key={index} type="1">
                      {orderList.orders.map((order, indexTwo) =>
                        order.name.toLowerCase().includes("juice") ? (
                          <li key={indexTwo} className="orders-list-item">
                            <p style={{ color: "red" }}>{order.name}</p>
                            <p>
                              {order.quantity} X {order.unitPrice} ={" "}
                              {order.subTotal} LKR
                            </p>
                          </li>
                        ) : (
                          <li key={indexTwo} className="orders-list-item">
                            <p>{order.name}</p>
                            <p>
                              {order.quantity} X {order.unitPrice} ={" "}
                              {order.subTotal} LKR
                            </p>
                          </li>
                        )
                      )}
                      <div>
                        <h6
                          color="red"
                          className="order-list-total"
                          style={{ fontWeight: "bold" }}
                        >
                          {orderList.total} LKR
                        </h6>
                      </div>
                    </ol>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    {orderList.receiptLink ? (
                      <div className="link-space">
                        <a
                          href={`whatsapp://send?text=${orderList.receiptLink}`}
                          data-action="share/whatsapp/share"
                        >
                          Share via Whatsapp
                          <WhatsAppIcon
                            color="success"
                            fontSize="large"
                            style={{ paddingLeft: "10px" }}
                          />
                        </a>
                        |
                        <a
                          href={`${orderList.receiptLink}`}
                          download
                          target="_blank"
                        >
                          Download Directly
                          <DownloadForOfflineIcon
                            color="info"
                            fontSize="large"
                            style={{ paddingLeft: "10px" }}
                          />
                        </a>
                      </div>
                    ) : (
                      <Button
                        onClick={() => generatePDF(orderList)}
                        variant={"warning"}
                      >
                        Generate PDF
                      </Button>
                    )}
                  </div>
                </div>
                <br />
                <br />
              </div>
            ))}
          </>
        )}
      </Col>
    </Row>
  );
};
