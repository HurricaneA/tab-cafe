import { StyleSheet, View } from "@react-pdf/renderer";
import { InvoiceInterface } from "../../interfaces";
import { InvoiceTableFooter } from "./InvoiceTableFooter";
import { InvoiceTableHeader } from "./InvoiceTableHeader";
import { InvoiceTableRow } from "./InvoiceTableRow";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "red",
  },
});

export const InvoiceItemsTable = ({
  invoice,
}: {
  invoice: InvoiceInterface;
}) => (
  <View style={styles.tableContainer}>
    <InvoiceTableHeader />
    <InvoiceTableRow items={invoice.items} />
    <InvoiceTableFooter items={invoice.items} />
  </View>
);
