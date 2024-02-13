import { View, StyleSheet } from "react-native";
import StyledText from "../../ui/StyledText";

interface CreditsSectionProps {
  author: string;
  illustrator: string | null;
  translator: string | null;
}

export default function CreditsSection({
  author,
  illustrator,
  translator,
}: CreditsSectionProps) {
  return (
    <View style={styles.section}>
      <StyledText style={styles.sectionHeading}>Twórcy</StyledText>
      <View>
        <View style={styles.authorRow}>
          <StyledText secondary>Bajka</StyledText>
          <StyledText>{author ? author : "nieznany"}</StyledText>
        </View>
        {illustrator && (
          <View style={styles.authorRow}>
            <StyledText secondary>Ilustracje</StyledText>
            <StyledText>{illustrator}</StyledText>
          </View>
        )}
        {translator && (
          <View style={styles.authorRow}>
            <StyledText secondary>Translacja</StyledText>
            <StyledText>{translator}</StyledText>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  authorRow: {
    flexDirection: "row",
    gap: 30,
  },
});
