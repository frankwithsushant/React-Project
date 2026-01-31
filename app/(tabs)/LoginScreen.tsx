import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { ArrowRight, Eye, EyeOff } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert, Image, StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /* EMAIL VALIDATION */
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /* GOOGLE AUTH */
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "421149094997-nm4drs9q2prm2jd1hj3scfhd5bj46tu5.apps.googleusercontent.com",
    androidClientId:
      "421149094997-isnb8tkm4t2skuf07ta62k3vgui1sqca.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.accessToken) {
        fetchGoogleUser(authentication.accessToken);
      }
    }

    if (response?.type === "error") {
      setLoading(false);
      Alert.alert("Error", "Google sign-in cancelled");
    }
  }, [response]);

  /* FETCH GOOGLE USER */
  const fetchGoogleUser = async (token: string) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = await res.json();

      await AsyncStorage.setItem("user", JSON.stringify(user));
      setLoading(false);

      Alert.alert("Login Successful", `Welcome ${user.name}`);
      router.replace("/(tabs)/Onboarding");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Google login failed");
    }
  };


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    const user = { email };
    await AsyncStorage.setItem("user", JSON.stringify(user));

    Alert.alert("Success", `Logged in as ${email}`);
    router.replace("/(tabs)/Onboarding");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Logo */}
        <View style={styles.logoBox}>
          <Text style={styles.logo}>🚀</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Unlock Your Potential</Text>
        <Text style={styles.subtitle}>Your AI Career Co-pilot awaits</Text>

        {/* Email */}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          placeholder="name@example.com"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Password */}
        <View style={styles.passwordHeader}>
          <Text style={styles.label}>Password</Text>
          <TouchableOpacity onPress={() => Alert.alert("Forgot Password")}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passwordBox}>
          <TextInput
            placeholder="Enter Passward"
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </TouchableOpacity>
        </View>

        {/* Continue */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Continue</Text>
          <ArrowRight size={18} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.info}>
          No credit card required. Start growing today.
        </Text>

        {/* OR */}
        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* GOOGLE LOGIN */}
        <TouchableOpacity
          style={styles.googleBtn}
          disabled={!request || loading}
          onPress={() => {
            setLoading(true);
            promptAsync();
          }}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.googleContent}>
              <Image
                source={require("../../assets/images/google.png")}
                style={styles.googleIcon}
              />
              <Text style={styles.googleText}>Continue with Google</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Signup */}
        <Text style={styles.signup}>
          Don’t have an account?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => router.push("/(tabs)/SignUpPage")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  logoBox: {
    alignSelf: "center",
    backgroundColor: "#eef4ff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  logo: {
    fontSize: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forgot: {
    color: "#2563eb",
    fontSize: 13,
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  info: {
    textAlign: "center",
    color: "#9ca3af",
    marginVertical: 12,
    fontSize: 12,
  },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  or: {
    marginHorizontal: 10,
    color: "#9ca3af",
  },
  googleBtn: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  googleText: {
    fontWeight: "600",
  },
  googleContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  googleIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  signup: {
    textAlign: "center",
    marginTop: 16,
    color: "#6b7280",
  },
  signupLink: {
    color: "#2563eb",
    fontWeight: "600",
  },
});
