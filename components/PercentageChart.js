import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomPercentageChart = ({ percentage }) => {
  // Calculate filled degrees ensuring 100% fills up the entire circle
  const filledDegrees = percentage === 100 ? 359.99 : percentage * 3.6;
  const remainderDegrees = 360 - filledDegrees;

  // Calculate the styles dynamically based on the percentage
  const chartStyles = {
    borderTopColor: filledDegrees > 180 ? '#63EC55' : 'transparent',
    borderRightColor: filledDegrees > 90 ? '#63EC55' : 'transparent',
    borderBottomColor: filledDegrees > 0 ? '#63EC55' : 'transparent',
    transform: [{ rotate: `${filledDegrees}deg` }],
  };

  return (
    <View style={styles.container}>
      <View style={[styles.chart, chartStyles]} />
      <Text style={styles.percentage}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  chart: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 5,
    borderLeftColor: 'transparent',
    borderTopColor: '#63EC55',
    borderRightColor: '#63EC55',
    borderBottomColor: '#63EC55',
    transform: [{ rotate: '0deg' }],
  },
  percentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#63EC55',
    position: 'absolute',
  },
});

export default CustomPercentageChart;
