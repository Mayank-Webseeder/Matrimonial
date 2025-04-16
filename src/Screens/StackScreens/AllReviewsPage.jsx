import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import styles from '../StyleScreens/AllReviewsPageStyle';
import { Rating } from 'react-native-ratings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import { SH, SW } from '../../utils/Dimensions';
import moment from 'moment';
const AllReviewsPage = ({ route, navigation }) => {
    const { reviews } = route.params;
    useEffect(() => {
        console.log("reviews", reviews);
    }, [])
    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <View style={Globalstyles.header}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={[Globalstyles.headerText, { textAlign: "left" }]}>All Reviews</Text>
                </View>
            </View>
            <ScrollView style={{ marginVertical: SH(10) }} showsVerticalScrollIndicator={false}>
                {reviews.map((review, index) => (
                    <View key={review._id || index} style={styles.reviewContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View>
                                <Image
                                    source={review?.userId?.photoUrl[0]
                                        ? { uri: review.userId.photoUrl[0] }
                                        : require("../../Images/NoImage.png") // Fallback image
                                    }
                                    style={{ width: SW(50), height: SH(50), borderRadius: 50 }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{ flex: 1, marginHorizontal: SW(10) }}>
                                <Text style={styles.reviewName}>{review?.userId?.username || "Unknown"}</Text>
                                <View style={styles.reviewRating}>
                                    <Rating
                                        type="star"
                                        ratingCount={5}
                                        imageSize={15}
                                        startingValue={review?.rating}
                                        readonly
                                    />
                                </View>
                                <Text style={styles.reviewText}>{review?.review}</Text>

                            </View>
                            <View style={{ alignSelf: "flex-start" }}>
                                <Text style={styles.reviewDate}>
                                    {moment(review.createdAt).format("DD-MM-YYYY")}
                                </Text>
                                <Text style={styles.reviewDate}>
                                    {moment(review.createdAt).format("hh:mm A")}
                                </Text>

                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AllReviewsPage;
