import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width, height } = Dimensions.get("window");

// Mock Data
const CARDS = [
  {
    id: 1,
    icon: <Feather name="activity" size={24} color="#2563EB" />,
    iconBg: "#DBEAFE",
    title: "Analyze & Upskill",
    description: "Identify gaps and learn fast with personalized plans.",
  },
  {
    id: 2,
    icon: <Feather name="mic" size={24} color="#7C3AED" />,
    iconBg: "#F3E8FF",
    title: "Practice Interview",
    description: "Real-time feedback to boost confidence.",
  },
  {
    id: 3,
    icon: <Feather name="file-text" size={24} color="#2563EB" />,
    iconBg: "#DBEAFE",
    title: "Resume Builder",
    description: "Auto-generate tailored resumes instantly.",
  },
];

export default function AICareerCopilot() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* BACKGROUND LAYER  */}
      <View style={styles.backgroundLayer}>
        {/* Your local image */}
        <Image
          source={require("../../assets/images/Photo.jpeg")}
          style={styles.headerImage}
          resizeMode="cover"
        />

        {/* Top Overlay */}
        <LinearGradient
          colors={["rgba(255,255,255,0.0)", "rgba(255,255,255,0.1)"]}
          style={styles.topOverlay}
        />

        {/* BOTTOM FADE: Fades image into white background */}
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.9)", "#FFFFFF"]}
          locations={[0, 0.6, 1]}
          style={styles.bottomFade}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.topSpacer} />

        {/* HEADER TEXT */}
        <View style={styles.textSection}>
          <Text style={styles.headline}>
            Your AI Career{"\n"}
            <Text style={styles.headlineHighlight}>Co-Pilot</Text>
          </Text>
          <Text style={styles.subtitle}>
            Don’t just apply. Evolve. Build skills, practice interviews, and
            apply automatically.
          </Text>
        </View>

        {/* ADDED SEPARATOR */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
        </View>

        {/* CARDS SECTION */}
        <View style={styles.cardsSection}>
          <Text style={styles.sectionLabel}>HOW IT WORKS</Text>

          <View style={styles.cardsWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardsScrollContent}
              decelerationRate="fast"
              snapToInterval={240}
            >
              {CARDS.map((card) => (
                <View key={card.id} style={styles.card}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: card.iconBg },
                    ]}
                  >
                    {card.icon}
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>{card.title}</Text>
                    <Text style={styles.cardDesc}>{card.description}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.linkContainer}>
            <Text style={styles.linkText}>See how it works</Text>
            <Feather
              name="arrow-right"
              size={16}
              color="#4B5563"
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)/LoginScreen")}
          >
            <Text style={styles.buttonText}>Get Started Free</Text>
          </TouchableOpacity>

          <View style={styles.disclaimerContainer}>
            <Feather
              name="lock"
              size={12}
              color="#9CA3AF"
              style={{ marginRight: 6, marginTop: 2 }}
            />
            <View>
              <Text style={styles.disclaimerText}>
                Your API key stays on your device.
              </Text>
              <Text style={styles.disclaimerText}>
                No data selling. No recruiter spam.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  backgroundLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
    zIndex: 0,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },

  contentContainer: {
    flex: 1,
    zIndex: 1,
    justifyContent: "flex-end",
  },

  topSpacer: {
    flexGrow: 1,
  },

  textSection: {
    paddingHorizontal: 24,
    marginBottom: 20, 
  },
  headline: {
    fontSize: 40,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 46,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  headlineHighlight: {
    color: "#2563EB",
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 26,
    color: "#4B5563",
    fontWeight: "400",
    maxWidth: "95%",
  },

  separatorContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  separatorLine: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.05)",
  },

  cardsSection: {
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9CA3AF",
    letterSpacing: 1.2,
    marginBottom: 16,
    marginLeft: 24,
    textTransform: "uppercase",
  },
  cardsWrapper: {
    height: 200,
  },
  cardsScrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  card: {
    width: 220,
    height: 180,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginRight: 16,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },

  footerContainer: {
    backgroundColor: "#FAFAFA",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
    alignItems: "center",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  linkText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4B5563",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  disclaimerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  disclaimerText: {
    fontSize: 12,
    color: "#9CA3AF",
    lineHeight: 16,
    textAlign: "left",
  },
});
