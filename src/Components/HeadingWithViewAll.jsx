import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SF, SH, SW } from '../utils/Dimensions';
import Colors from '../utils/Colors';

const HeadingWithViewAll = ({ heading, showViewAll = false, onViewAllPress, headingStyle }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.headingStyle, headingStyle]}>{heading}</Text>
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
    paddingHorizontal: SW(15),
    backgroundColor: Colors.gray,
    paddingVertical: SH(2),
    borderRadius: 5,
    marginHorizontal: SW(5)
  },
  headingStyle: {
    fontSize: SF(13),
    fontFamily: 'Poppins-Bold',
    color: Colors.black,
    textTransform:"uppercase"
  },
  viewAllText: {
    fontSize: SF(14),
    color: Colors.theme_color,
    fontFamily: 'Poppins-Bold',
  },
});

export default HeadingWithViewAll;
