import React from 'react';
import { View, Text, ScrollView, TouchableOpacity,SafeAreaView,StatusBar } from 'react-native';
import styles from '../StyleScreens/AllReviewsPageStyle';
import { Rating } from 'react-native-ratings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
const AllReviewsPage = ({ route, navigation }) => {
    const { reviews } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                <Text style={styles.headerText}>All Reviews</Text>
            </View>
            <ScrollView>
                {reviews.map((review, index) => (
                    <View key={index} style={styles.reviewContainer}>
                        <Text style={styles.reviewName}>{review.reviewerName} ({review.reviewerCountry})</Text>
                        <Text style={styles.reviewStatus}>{review.reviewerStatus}</Text>
                        <View style={styles.reviewRating}>
                            <Rating
                                type="star"
                                ratingCount={5}
                                imageSize={15}
                                startingValue={review.rating}
                                readonly
                            />
                        </View>
                        <Text style={styles.reviewText}>{review.reviewText}</Text>
                        <View style={styles.FlexContainer}>
                            <Text style={styles.helpfulText}>Helpful? | Yes ({review.helpful.yes}) | No ({review.helpful.no})</Text>
                            <Text style={styles.reviewDate}>{review.reviewDate}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AllReviewsPage;
