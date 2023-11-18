import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    marginTop: 12,
  },
  reportTitle: {
    fontSize: 12,
    textAlign: "center",
  },
});

Font.registerEmojiSource({
  format: "png",
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});

export const InvoiceThankYouMsg = () => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>
      Thank you for helping another child 😀
    </Text>
  </View>
);
