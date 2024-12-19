import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SF, SW, SH } from '../utils/Dimensions';
import Colors from '../utils/Colors';

const HeadingWithViewAll = ({ heading, showViewAll = false, onViewAllPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      {showViewAll && (
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SH(10),
    marginVertical: SH(10),
    paddingHorizontal: SH(15),
    backgroundColor:Colors.gray,
    paddingVertical: SH(7),
  },
  heading: {
    fontSize: SF(18),
    fontFamily: 'Poppins-Bold',
  },
  viewAllText: {
    fontSize: SF(14),
    color: Colors.theme_color,
    fontFamily: 'Poppins-Bold',
  },
});

export default HeadingWithViewAll;
