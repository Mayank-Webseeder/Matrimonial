import { Text, View, Image, ScrollView, TouchableOpacity,SafeAreaView,StatusBar } from 'react-native';
import React, { useState } from 'react';
import { PanditDetailData } from '../../DummyData/DummyData';
import styles from '../StyleScreens/PanditDetailPageStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { Rating } from 'react-native-ratings';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const KathavachakDetailsPage = ({ navigation, item }) => {
    const pandit = PanditDetailData[0];
    const [userRating, setUserRating] = useState(0);
    const images = pandit.images || [];


    const renderImages = (images) => {
        if (images.length === 0) {
          return <Text style={styles.noImageText}>No images available for this post</Text>;
        }
      
        // Create rows of images
        const rows = [];
        for (let i = 0; i < images.length; i += 2) {
          rows.push(
            <View style={styles.imageRow} key={i}>
              <Image source={images[i]} style={styles.image} />
              {/* If there's an image next to it, show it */}
              {images[i + 1] && <Image source={images[i + 1]} style={styles.image} />}
            </View>
          );
        }
      
        return <View style={styles.imageContainer}>{rows}</View>;
      };
      
    
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />
            <View style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{pandit.name}</Text>
                </View>
                <View style={styles.righticons}>
                    {/* <AntDesign name={'search1'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} /> */}
                    <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification') }} />
                </View>
            </View>
            <ScrollView>
                <View style={styles.profileSection}>
                    <Image source={pandit.image} style={styles.profileImage} />
                    <View>
                        <Text style={styles.name}>{pandit.name}</Text>
                        <View style={styles.FlexContainer}>
                            <Text style={styles.city}>{pandit.city}</Text>
                            <Text style={styles.surname}>{pandit.surname}</Text>
                        </View>
                        <View style={styles.FlexContainer}>
                            <Rating
                                type="star"
                                ratingCount={5}
                                imageSize={15}
                                startingValue={pandit.rating}
                                readonly
                            />
                            <Text style={styles.rating}>{pandit.rating} star Rating ( 100)</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.text}>{pandit.description}</Text>
                    </View>

                    <View style={styles.sharecontainer}>
                        <View style={styles.iconContainer}>
                            <FontAwesome name="bookmark-o" size={20} color={Colors.dark} />
                            <Text style={styles.iconText}>Save</Text>
                        </View>

                        <View style={styles.iconContainer}>
                            <Feather name="send" size={20} color={Colors.dark} />
                            <Text style={styles.iconText}>Shares</Text>
                        </View>
                        <TouchableOpacity style={styles.Button}>
                            <MaterialIcons name="call" size={20} color={Colors.light} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ReportPage')} >
                            <MaterialIcons name="error-outline" size={24} color={Colors.dark} />
                            <Text style={styles.iconText}>Report</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Services List</Text>
                        <View style={styles.servicesGrid}>
                            {pandit.servicesList.map((service, index) => (
                                <View key={index} style={styles.serviceContainer}>
                                    <Text style={styles.serviceText}>{service}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.ReviewPost}>
                            <View>
                                <Text style={styles.sectionTitle}>Reviews & Rating</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.postReviewButton} onPress={() => navigation.navigate('PostReview')}>
                                    <Text style={styles.postReviewText}>Post Review</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.rating}>{pandit.rating} (100 star Rating)</Text>

                        <View style={styles.ratingCount}>
                            <Rating
                                type="star"
                                ratingCount={5}
                                imageSize={15}
                                startingValue={pandit.rating}
                                readonly
                            />
                        </View>

                        <Text style={styles.reviewLabel}>Your Review</Text>
                        <View style={styles.ratingCount}>
                            <Rating
                                type='star'
                                ratingCount={5}
                                imageSize={15}
                                startingValue={userRating}
                                onFinishRating={(rating) => setUserRating(rating)}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { textAlign: "center" }]}>Reviews</Text>
                    {pandit.reviews.slice(0, 2).map((review, index) => (
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
                    {pandit.reviews.length > 2 && (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AllReviewsPage', { reviews: pandit.reviews })}
                            style={styles.viewMoreButton}>
                            <Text style={styles.viewMoreText}>View More Reviews</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.container}>
                    {renderImages(images)}
                </View>
                <View style={styles.socialIcons}>
                    <Image source={require('../../Images/website.png')} style={styles.websiteIcon} />
                    <MaterialCommunityIcons name="youtube" size={30} color="#FF0000" />
                    <FontAwesome5 name="whatsapp" size={30} color="#25D366" />
                    <FontAwesome5 name="facebook" size={30} color="#3b5998" />
                    <FontAwesome5 name="instagram" size={30} color="#E4405F" />
                </View>

                <Image source={require('../../Images/slider.png')} style={styles.Bottomimage} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default KathavachakDetailsPage;
