import { COLORS } from "@/constants/colors";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  BarChart2,
  Briefcase,
  Clipboard,
  Maximize2,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// 1. DATA SOURCE

const JOB_TITLES = [
  "AI Research Scientist",
  "Machine Learning Engineer",
  "Prompt Engineer",
  "Full Stack Developer",
  "Data Scientist",
  "Cloud Architect",
  "Cybersecurity Analyst",
  "DevOps Engineer",
  "Blockchain Developer",
  "UX/UI Designer",
  "Product Manager",
  "Digital Marketing Manager",
  "Business Intelligence Analyst",
  "Mobile Application Developer",
  "Site Reliability Engineer",
  "Robotics Engineer",
  "VR/AR Developer",
  "Sustainability Manager",
  "Customer Success Manager",
  "Sales Development Representative",
  "Video Editor",
  "Content Strategist",
  "Project Manager",
  "Scrum Master",
  "Backend Developer",
  "Frontend Developer",
  "Game Developer",
  "QA Automation Engineer",
  "Data Engineer",
  "Solutions Architect",
  "HR Business Partner",
  "Financial Analyst",
  "Supply Chain Manager",
  "Ethical Hacker",
  "Chief of Staff",
  "Growth Marketing Manager",
  "Technical Writer",
  "Bioinformatics Scientist",
  "IoT Specialist",
  "5G Network Engineer",
  "Renewable Energy Engineer",
  "Social Media Manager",
  "E-commerce Specialist",
  "SEO Specialist",
  "Clinical Research Associate",
  "Physician Assistant",
  "Mental Health Counselor",
  "Information Security Manager",
  "Database Administrator",
  "System Administrator",
];

// 2. MAIN COMPONENT

export default function SkillBuilderScreen() {
  const router = useRouter();
  const [targetRole, setTargetRole] = useState("");
  const [jobDetails, setJobDetails] = useState("");
  const [errors, setErrors] = useState<{
    targetRole?: string;
    jobDetails?: string;
  }>({});

  // Autocomplete State
  const [filteredJobs, setFilteredJobs] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Handle Autocomplete Logic
  const handleRoleChange = (text: string) => {
    setTargetRole(text);
    if (text.length > 0) {
      const filtered = JOB_TITLES.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredJobs(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionPress = (item: string) => {
    setTargetRole(item);
    setShowSuggestions(false);
    Keyboard.dismiss();
  };

  const validateForm = () => {
    const newErrors: { targetRole?: string; jobDetails?: string } = {};
    if (!targetRole.trim()) {
      newErrors.targetRole = "Please select a target job title";
    }
    if (!jobDetails.trim()) {
      newErrors.jobDetails = "Please paste job details";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBackPress = () => {
    router.back();
  };

  const handlePasteLink = () => {
    // Handle paste URL or text
    // TODO: Implement clipboard paste functionality
    console.log("Paste link pressed");
  };

  const handleAnalyzeGaps = () => {
    if (validateForm()) {
      // Navigate to results screen
      router.push("/skillBuilder" as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ArrowLeft color={COLORS.icon.black} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Skill Builder</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.scrollContent}>
          {/* HERO SECTION */}
          <View style={styles.heroSection}>
            <Text style={styles.headline}>
              Let's find out what you're missing to land that role.
            </Text>
            <Text style={styles.subtext}>
              Define your target. We'll analyze the requirements against your
              profile to find your gaps.
            </Text>
          </View>

          {/* FORM SECTION */}
          <View style={styles.formContainer}>
           
            <View style={[styles.inputGroup, { zIndex: 1000 }]}>
              <Text style={styles.label}>Target Job Title</Text>

              <View style={styles.inputWrapper}>
                <Briefcase
                  color={COLORS.text.black}
                  size={20}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Senior Product Designer"
                  placeholderTextColor={COLORS.text.lightGray}
                  value={targetRole}
                  onChangeText={handleRoleChange}
                />
              </View>
              {errors.targetRole && (
                <Text style={styles.errorText}>{errors.targetRole}</Text>
              )}

              {/* Autocomplete Dropdown */}
              {showSuggestions && filteredJobs.length > 0 && (
                <View style={styles.suggestionsListContainer}>
                  <FlatList
                    data={filteredJobs}
                    keyExtractor={(item) => item}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.suggestionItem}
                        onPress={() => handleSuggestionPress(item)}
                      >
                        <Text style={styles.suggestionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    style={{ maxHeight: 200 }}
                  />
                </View>
              )}
            </View>

            {/* FIELD 2: JOB DETAILS */}
            <View style={[styles.inputGroup, { zIndex: 1 }]}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Job Details</Text>
                <TouchableOpacity
                  style={styles.pasteLinkContainer}
                  onPress={handlePasteLink}
                >
                  <Clipboard color={COLORS.icon.blue} size={16} />
                  <Text style={styles.pasteLinkText}>Paste URL or Text</Text>
                </TouchableOpacity>
              </View>
              {errors.jobDetails && (
                <Text style={styles.errorText}>{errors.jobDetails}</Text>
              )}

              <View style={styles.textAreaWrapper}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Paste the full job description or a link to the posting here..."
                  placeholderTextColor={COLORS.text.lightGray}
                  multiline
                  textAlignVertical="top"
                  value={jobDetails}
                  onChangeText={setJobDetails}
                />
                <Maximize2
                  color={COLORS.icon.light}
                  size={16}
                  style={styles.resizeIcon}
                />
              </View>
            </View>
          </View>

          {/* FOOTER BUTTON */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.analyzeButton}
              onPress={handleAnalyzeGaps}
            >
              <BarChart2
                color={COLORS.icon.white}
                size={20}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.analyzeButtonText}>Analyze My Gaps</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// 3. STYLES

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.icon.black,
  },
  backButton: {
    padding: 4,
  },


  heroSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  headline: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.Background,
    marginBottom: 12,
    lineHeight: 36,
  },
  subtext: {
    fontSize: 16,
    color: COLORS.text.secondary,
    lineHeight: 24,
  },

  formContainer: {
    gap: 24,
  },
  inputGroup: {
    position: "relative",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.Background,
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.background.surface,
    borderRadius: 12,
    backgroundColor: COLORS.text.primary,
    height: 50,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.black,
    height: "100%",
  },

  suggestionsListContainer: {
    position: "absolute",
    top: 85,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 9999, 
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.lighter,
  },
  suggestionText: {
    fontSize: 15,
    color: COLORS.text.light,
  },

  pasteLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pasteLinkText: {
    color: COLORS.icon.blue,
    fontWeight: "600",
    fontSize: 14,
  },
  textAreaWrapper: {
    borderWidth: 1,
    borderColor: COLORS.text.lightGray,
    borderRadius: 12,
    backgroundColor: COLORS.text.primary,
    minHeight: 150,
    padding: 16,
    position: "relative",
  },
  textArea: {
    fontSize: 16,
    color: COLORS.text.black,
    textAlignVertical: "top",
    height: 120, 
  },
  resizeIcon: {
    position: "absolute",
    bottom: 12,
    right: 12,
  },

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.lighter,
  },
  analyzeButton: {
    backgroundColor: COLORS.icon.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: COLORS.button.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 135,
  },
  analyzeButtonText: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});