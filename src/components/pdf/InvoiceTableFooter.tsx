import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Order } from "../../interfaces";

const borderColor = "#fc9097";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#eb6767",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "85%",
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

export const InvoiceTableFooter = ({ items }: { items: Order[] }) => {
  const total = items
    .map((item) => item.quantity * item.unitPrice)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <View style={styles.row}>
      <Text style={styles.description}>TOTAL</Text>
      <Text style={styles.total}>
        {Number.parseFloat(total.toString()).toFixed(2)}
      </Text>
    </View>
  );
};
