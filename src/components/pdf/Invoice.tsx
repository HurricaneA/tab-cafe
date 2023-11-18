import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { InvoiceInterface } from "../../interfaces";
import { InvoiceItemsTable } from "./InvoiceItemsTable";
import { InvoiceNo } from "./InvoiceNo";
import { InvoiceThankYouMsg } from "./InvoiceThankYouMsg";
import { InvoiceTitle } from "./InvoiceTitle";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export const Invoice = ({ invoice }: { invoice: InvoiceInterface }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* <Image style={styles.logo} src={logo} /> */}
      <InvoiceTitle title="Tab Café- Invoice" />
      <InvoiceNo invoice={invoice} />
      <InvoiceItemsTable invoice={invoice} />
      <InvoiceThankYouMsg />
    </Page>
  </Document>
);
