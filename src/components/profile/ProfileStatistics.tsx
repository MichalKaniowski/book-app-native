import { View, StyleSheet } from "react-native";
import StyledText from "../ui/StyledText";
import { useCallback } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import { firebaseAuth } from "../../../FirebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import useFetchUser from "../../hooks/useFetchUser";
import { getTimeSpentText } from "../../utils/getTimeSpentText";

export default function ProfileStatistics() {
  const {
    data: user,
    isLoading,
    refetch,
  } = useFetchUser(firebaseAuth.currentUser!.uid);

  useFocusEffect(
    useCallback(() => {
      refetch(firebaseAuth.currentUser!.uid);
    }, [])
  );

  return (
    <View style={styles.statisticsContainer}>
      <Spinner visible={isLoading} />
      <View style={styles.statisticsBox}>
        <View
          style={{
            ...styles.statisticsImageContainer,
            backgroundColor: "gold",
          }}
        >
          <FeatherIcon name="clock" size={26} color="#fff" />
        </View>
        <StyledText style={styles.statisticsOutlinedText}>
          {getTimeSpentText(user?.spentTime)}
        </StyledText>
        <StyledText>Czas czytania</StyledText>
      </View>
      <View style={styles.statisticsBox}>
        <View
          style={{
            ...styles.statisticsImageContainer,
            backgroundColor: "blue",
          }}
        >
          <FeatherIcon name="book" size={26} color="#fff" />
        </View>
        <StyledText style={styles.statisticsOutlinedText}>
          {user?.finishedBooks.length}
        </StyledText>
        <StyledText>Przeczytane bajki</StyledText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statisticsContainer: { flexDirection: "row" },
  statisticsBox: {
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
    gap: 2,
  },
  statisticsImageContainer: { padding: 8, borderRadius: 100 },
  statisticsOutlinedText: { fontSize: 16, fontWeight: "bold" },
});
