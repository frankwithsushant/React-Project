import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// Get screen width to calculate card sizes dynamically
const { width } = Dimensions.get("window");
const CARD_MARGIN = 24;
const CARD_WIDTH = width - CARD_MARGIN * 2;

const CAROUSEL_DATA = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1677442135136-760c813028c0?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function App({ navigation }: { navigation?: any }) {
  const [apiKey, setApiKey] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // State to toggle visibility of the API key text
  const [isSecure, setIsSecure] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadKey();
  }, []);

  // AUTO SCROLL LOGIC 
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= CAROUSEL_DATA.length) {
        nextIndex = 0;
      }

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const loadKey = async () => {
    try {
      const saved = await AsyncStorage.getItem("OPENAI_API_KEY");
      if (saved) setApiKey(saved);
    } catch (e) {
      console.log("Failed to load key");
    }
  };

  const pasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    setApiKey(text);
    setIsSecure(false);
  };

  const openLink = () => {
    Linking.openURL("https://platform.openai.com/api-keys");
  };

  // NAVIGATION LOGIC 
  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else {
      router.replace("/(tabs)/LoginScreen");
    }
  };

  const onMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);
    setActiveIndex(index);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ width: CARD_WIDTH }}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.contentContainer}>
        {/* HEADER (BACK BUTTON) */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Pagination Dots */}
        <View style={styles.dotsContainer}>
          {CAROUSEL_DATA.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, activeIndex === i && styles.activeDot]}
            />
          ))}
        </View>

        {/* Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={CAROUSEL_DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            decelerationRate="fast"
            onMomentumScrollEnd={onMomentumScrollEnd}
          />
        </View>

        <Text style={styles.title}>Wake up your{"\n"}Assistant</Text>

        <Text style={styles.subtitle}>
          Enter your API key to unlock mock interviews, automated applications,
          and skill analysis. Your key is stored locally and encrypted.
        </Text>

        {/* Input Section */}
        <Text style={styles.label}>OpenAI API Key</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="sk-..."
            placeholderTextColor="#9CA3AF"
            secureTextEntry={isSecure}
            style={styles.input}
            autoCapitalize="none"
          />

          {/* TOGGLE VISIBILITY BUTTON */}
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            style={styles.iconBtn}
          >
            <Feather
              name={isSecure ? "eye" : "eye-off"}
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>

          {/* PASTE BUTTON */}
          <TouchableOpacity onPress={pasteFromClipboard} style={styles.iconBtn}>
            <Feather name="clipboard" size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Links */}
        <View style={styles.linkRow}>
          <TouchableOpacity onPress={openLink}>
            <Text style={styles.link}>Get a free key here ↗</Text>
          </TouchableOpacity>

          <View style={styles.encryptedBadge}>
            <Feather
              name="lock"
              size={12}
              color="#6B7280"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.encryptedText}>Encrypted</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/(tabs)/DashBoard")}
        >
          <Text style={styles.buttonText}>Connect & Secure</Text>

          <Feather
            name="arrow-right"
            size={20}
            color="#FFF"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: CARD_MARGIN,
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginLeft: -8,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
   
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    height: 6,
    backgroundColor: "#2563EB",
    borderRadius: 3,
  },

  carouselContainer: {
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
    marginBottom: 32,
  },

  // --- Input ---
  label: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  iconBtn: {
    padding: 8, 
    marginLeft: 4,
  },

  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  link: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 14,
  },
  encryptedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  encryptedText: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "500",
  },

  button: {
    marginTop: "auto",
    marginBottom: 20,
    backgroundColor: "#2563EB",
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
