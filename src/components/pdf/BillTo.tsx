import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { InvoiceInterface } from "../../interfaces";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

export const BillTo = ({ invoice }: { invoice: InvoiceInterface }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Bill To:</Text>
    <Text>{invoice.company}</Text>
    <Text>{invoice.address}</Text>
  </View>
);
