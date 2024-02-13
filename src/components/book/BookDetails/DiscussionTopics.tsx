import { View, StyleSheet } from "react-native";
import StyledText from "../../ui/StyledText";

interface DiscussionTopicsProps {
  discussionTopics: string[];
}

export default function DiscussionTopics({
  discussionTopics,
}: DiscussionTopicsProps) {
  return (
    <View style={styles.section}>
      <StyledText style={styles.sectionHeading}>Tematy do dyskusji</StyledText>
      {discussionTopics.map((topic) => (
        <View key={topic} style={styles.discussionTopicContainer}>
          <StyledText style={styles.discussionTopicText}>{`\u2022`}</StyledText>
          <StyledText>{topic}</StyledText>
        </View>
      ))}
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
  discussionTopicContainer: { flexDirection: "row", marginBottom: 5 },
  discussionTopicText: { marginRight: 5 },
});
