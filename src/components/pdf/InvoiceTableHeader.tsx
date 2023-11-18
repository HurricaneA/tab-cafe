import { StyleSheet, Text, View } from "@react-pdf/renderer";

const borderColor = "#fc9097";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#eb6767",
    backgroundColor: "#eb6767",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  description: {
    width: "60%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  rate: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: "15%",
  },
});

export const InvoiceTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.description}>Item Description</Text>
    <Text style={styles.qty}>Quantity</Text>
    <Text style={styles.rate}>Unit Price</Text>
    <Text style={styles.amount}>Amount</Text>
  </View>
);
