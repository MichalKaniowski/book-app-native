import { useContext } from "react";
import { View, ViewStyle } from "react-native";
import { ThemeContext } from "../../store/ThemeContext";

interface StyledViewProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

export default function StyledView({ style, children }: StyledViewProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ backgroundColor: theme.background, ...style }}>
      {children}
    </View>
  );
}
