import Colors from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ActionCardProps {
  icon: string;
  title: string;
  subtitle: string;
  badge?: string;
  largeBadge?: boolean;
  rightIcon?: string;
  buttonText: string;
  buttonType: "primary" | "mock" | "hub";
  onPress?: () => void;
}

export default function ActionCard({
  icon,
  title,
  subtitle,
  badge,
  largeBadge,
  rightIcon,
  buttonText,
  buttonType,
  onPress,
}: ActionCardProps) {
  const router = useRouter();
  const getButtonColor = () => {
    switch (buttonType) {
      case "primary":
        return Colors.primary;
      case "mock":
        return "#7C3AED";
      case "hub":
        return "#EC4899";
      default:
        return Colors.primary;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconTitleContainer}>
          <Feather name={icon as any} size={24} color={getButtonColor()} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
        {badge && (
          <View style={[styles.badge, largeBadge && styles.largeBadge]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
        {rightIcon && (
          <Feather
            name={rightIcon as any}
            size={20}
            color="#10B981"
            style={{ marginLeft: 8 }}
          />
        )}
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: getButtonColor() }]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 12,
  },
  iconTitleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
    lineHeight: 18,
  },
  badge: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 40,
    alignItems: "center",
  },
  largeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 50,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#333",
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
