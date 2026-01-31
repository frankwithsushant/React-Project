import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Colors from '../constants/colors';

export default function ProgressCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ready to upgrade your career, Saurabh?</Text>
      <Text style={styles.subtitle}>Let’s get you to the next level today.</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Match for Senior Developer</Text>
        <Text style={styles.percent}>70%</Text>
      </View>

      <Progress.Bar
        progress={0.7}
        width={null}
        height={6}
        borderRadius={10}
        color={Colors.primary}
        unfilledColor={Colors.border}
        borderWidth={0}
      />

      <Text style={styles.goal}>Goal: 100% Match</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    margin: 16,
    padding: 16,
    borderRadius: 18,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textLight,
    marginVertical: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 6,
  },
  label: { fontSize: 13 },
  percent: { fontWeight: '700', color: Colors.primary },
  goal: {
    textAlign: 'right',
    fontSize: 11,
    marginTop: 6,
    color: Colors.textLight,
  },
});