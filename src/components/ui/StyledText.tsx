import { useContext } from "react";
import { Text, TextStyle } from "react-native";
import { ThemeContext } from "../../store/ThemeContext";

interface StyledTextProps {
  style?: TextStyle;
  children: React.ReactNode;
  secondary?: boolean;
}

export default function StyledText({
  style,
  children,
  secondary,
}: StyledTextProps) {
  const { theme } = useContext(ThemeContext);

  const color = secondary ? theme.secondary : theme.text;

  return <Text style={{ color: color, ...style }}>{children}</Text>;
}
