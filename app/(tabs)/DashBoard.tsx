import ActionCard from "@/components/ActionCard";
import Colors from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Feather name="menu" size={22} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/8088/8088469.png",
              }}
              style={styles.logo}
            />
            <Text style={styles.headerTitle}>Career Co-pilot</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity>
              <Feather name="bell" size={20} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="user" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View style={styles.matchCard}>
            <Text style={styles.matchTitle}>
              Ready to upgrade your career, Saurabh?
            </Text>

            <Text style={styles.matchDesc}>
              Let&apos;s get you to the next level today.
            </Text>

            <Text style={styles.matchSubBold}>Match for Senior Developer</Text>

            <View style={styles.progressRow}>
              <View style={styles.progressContainer}>
                <View style={styles.progressFill} />
              </View>
              <Text style={styles.matchPercent}>70%</Text>
            </View>

            <Text style={styles.goalText}>Goal: 100% Match</Text>
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Priority Actions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>

          <ActionCard
            icon="alert-triangle"
            title="Skill Gap Analysis"
            subtitle="Your Python & System Design skills need attention to reach Senior Level."
            badge="3/5"
            buttonText="Analyze Gaps"
            buttonType="primary"
            onPress={() => router.push("/(tabs)/SkillBuilder")}
          />

          <ActionCard
            icon="mic"
            title="Interview Readiness"
            subtitle="Last mock interview score. Focus on behavioral questions."
            badge="B+"
            largeBadge
            buttonText="Start Mock Interview"
            buttonType="mock"
          />

          <ActionCard
            icon="send"
            title="Auto-Apply"
            subtitle="Applications sent today. Your daily limit is 15."
            badge="0"
            largeBadge
            buttonText="Go to Hub"
            buttonType="hub"
          />

          <ActionCard
            icon="file-text"
            title="Bost your Resume with ATS"
            subtitle="Optimize your resume to pass ATS systems and get noticed faster."
            rightIcon="check-circle"
            buttonText="Build ATS Resume"
            buttonType="primary"
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    backgroundColor: "#f6f7fb",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },

  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  logo: {
    width: 26,
    height: 26,
  },

  headerRight: {
    flexDirection: "row",
    gap: 16,
  },

  matchCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },

  matchTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  matchDesc: {
    fontSize: 13,
    color: "#555",
    marginTop: 6,
    marginBottom: 23,
  },

  matchSubBold: {
    fontSize: 14,
    fontWeight: "700",
    marginVertical: 9,
    color: "#000",
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  progressContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
    overflow: "hidden",
  },

  progressFill: {
    width: "70%",
    height: "100%",
    backgroundColor: Colors.primary,
  },

  matchPercent: {
    fontWeight: "700",
  },

  goalText: {
    marginTop: 6,
    textAlign: "right",
    fontSize: 12,
    color: "#555",
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginVertical: 10,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  viewAll: {
    fontSize: 13,
    color: Colors.primary,
  },
});
