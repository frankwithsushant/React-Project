import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* GOOGLE AUTH */
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "421149094997-nm4drs9q2prm2jd1hj3scfhd5bj46tu5.apps.googleusercontent.com",
    androidClientId: "421149094997-isnb8tkm4t2skuf07ta62k3vgui1sqca.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  /* HANDLE GOOGLE RESPONSE */
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.accessToken) {
        handleGoogleSignUp(authentication.accessToken);
      }
    }

    if (response?.type === "error") {
      setLoading(false);
      Alert.alert("Error", "Google sign-in was cancelled or failed");
    }
  }, [response]);

  /* FETCH GOOGLE USER DATA */
  const fetchGoogleUser = async (token: string) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user info");
      }

      const userData = await res.json();
      return userData;
    } catch (error) {
      console.error("Error fetching Google user:", error);
      throw error;
    }
  };

  /* HANDLE GOOGLE SIGN UP */
  const handleGoogleSignUp = async (accessToken: string) => {
    setLoading(true);
    try {
      // Fetch user data from Google
      const googleUser = await fetchGoogleUser(accessToken);
      
      // Here you can send the user data to your backend
      console.log("Google User:", googleUser);

      // Store user data and navigate
      Alert.alert("Success", `Welcome ${googleUser.name}!`);
      
      // Navigate to dashboard or next screen
      router.push("/DashBoard");
    } catch (error) {
      console.error("Google sign-up error:", error);
      Alert.alert("Error", "Failed to sign up with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* PASSWORD VALIDATION */
  const handleContinue = () => {
    if (password !== confirmPassword) {
      Alert.alert(
        "Password Mismatch",
        "Password and Confirm Password must be the same",
      );
      return;
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
      
        <Text style={styles.emoji}>🚀</Text>

        <Text style={styles.title}>SIGN UP</Text>

        <TextInput
          placeholder="NAME"  
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="EMAIL"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="PASSWORD"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          placeholder="CONFIRM PASSWORD"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Continue Button */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
          <Text style={styles.primaryButtonText}>CONTINUE</Text>
        </TouchableOpacity>

        {/* Google Button */}
        <TouchableOpacity 
          style={styles.googleButton}
          onPress={() => promptAsync()}
          disabled={!request || loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#333" />
          ) : (
            <>
              <Image
                source={require("../../assets/images/google.png")}
                style={styles.googleIcon}
              />
              <Text style={styles.googleText}>CONTINUE WITH GOOGLE</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  emoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C9D2F0",
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  primaryButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#2F5BEA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  googleButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  googleText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#333",
  },
});
