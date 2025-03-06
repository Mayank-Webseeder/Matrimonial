import React,{useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import styles from '../StyleScreens/AllReviewsPageStyle';
import { Rating } from 'react-native-ratings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import { SH } from '../../utils/Dimensions';
import moment from 'moment';
const AllReviewsPage = ({ route, navigation }) => {
    const { reviews } = route.params;
   useEffect(()=>{
     console.log("reviews",reviews);
   },[])
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
                     <View style={styles.FlexContainer}>
                         <View style={styles.FlexContainer}>
                             <Text style={styles.reviewName}>{review?.userId?.username || "Unknown"}</Text>

                         </View>

                         <Text style={styles.reviewDate}>
                             {moment(review.createdAt).format("DD/MM/YYYY")}
                         </Text>
                     </View>
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
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AllReviewsPage;
