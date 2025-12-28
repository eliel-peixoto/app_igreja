import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FormSection = ({ title, children, style }) => {
  return (
    <View style={[styles.section, style]}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 32, // espaço entre seções
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default FormSection;
