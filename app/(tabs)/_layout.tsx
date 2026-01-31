import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="interview" />
      <Stack.Screen name="skills" />
      <Stack.Screen name="results" />
      <Stack.Screen name="LandingPage" />
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="SignUpPage" />
      <Stack.Screen name="Onboarding" />
    </Stack>
  );
}
