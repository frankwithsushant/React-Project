import { Feather } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <Feather name="home" size={22} />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Feather name="briefcase" size={22} />
        <Text style={styles.label}>Jobs</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Feather name="book" size={22} />
        <Text style={styles.label}>Learn</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Feather name="user" size={22} />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 12 : 500,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

  item: {
    alignItems: 'center',
  },

  label: {
    fontSize: 11,
    marginTop: 2,
  },
});