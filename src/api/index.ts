import axios, { AxiosResponse } from "axios";
import {
  GetOrdersInterface,
  GetUploadedPDFInterface,
  ItemsInterface,
  OrdersInterface,
} from "../interfaces";
import { baseUrl } from "../util/constants";

export const getItems = async (): Promise<ItemsInterface[]> => {
  return await axios
    .get(`${baseUrl}/items`)
    .then((response: AxiosResponse<ItemsInterface[]>) =>
      response.data.map((item) => ({ ...item, quantity: 0 }))
    );
};

export const placeOrder = async (order: OrdersInterface[]) => {
  console.log(order);

  const data = {
    items: order,
  };
  await axios
    .post(`${baseUrl}/orders`, data)
    .then((result) => result.data)
    .catch((err) => {
      alert(err);
    });
};

export const getOrders = async (): Promise<GetOrdersInterface[]> => {
  return await axios
    .get(`${baseUrl}/orders`)
    .then((response: AxiosResponse<GetOrdersInterface[]>) =>
      response.data.map((item) => ({ ...item, quantity: 0 }))
    );
};

export const uploadPDF = async (
  pdf: Blob,
  randomId: string,
  orderId: number
): Promise<GetUploadedPDFInterface> => {
  const myFile = new File([pdf], `invoice-${randomId}.pdf`, {
    lastModified: Number(randomId),
  });

  const formData = new FormData();
  formData.append("file", myFile);
  formData.append("orderId", orderId.toString());

  console.log("Sending...");

  return await axios
    .post(`${baseUrl}/orders/pdf`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("Got data ", res);
      return res.data;
    })
    .catch((err) => {
      alert("Please try again later " + err);
    });
};

export const blobToFile = (theBlob: Blob, fileName: string): File => {
  const b: any = theBlob;
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  //Cast to a File() type
  return theBlob as File;
};
