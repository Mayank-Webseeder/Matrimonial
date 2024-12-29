import { Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { PanditDetailData } from '../../DummyData/DummyData';
import styles from '../StyleScreens/PanditDetailPageStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { Rating } from 'react-native-ratings';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
const PanditDetailPage = ({ navigation }) => {
    const pandit = PanditDetailData[0];
    const [userRating, setUserRating] = useState(0);
    const imageData = pandit?.images;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ flexDirection: "row" }}>
                    <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
                    <Text style={{ color: Colors.theme_color }}>{pandit.name}</Text>
                </TouchableOpacity>
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

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.text}>{pandit.description}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Abilities</Text>
                    <Text style={styles.text}>{pandit.abilities}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    <Text style={styles.text}>{pandit.experience}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Expertise</Text>
                    {pandit.expertise.map((item, index) => (
                        <Text key={index} style={styles.text}>{item}</Text>
                    ))}
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
                    <View style={styles.iconContainer}>
                        <AntDesign name="minuscircleo" size={20} color={Colors.dark} />
                        <Text style={styles.iconText}>Report</Text>
                    </View>
                    <TouchableOpacity style={styles.Button}>
                        <MaterialIcons name="call" size={20} color={Colors.light} />
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
                    <Text style={styles.sectionTitle}>Reviews & Rating</Text>
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

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { textAlign: "center" }]}>Reviews</Text>
                    {pandit.reviews.map((review, index) => (
                        <View key={index} style={styles.reviewContainer}>
                            <Text style={styles.reviewName}>{review.reviewerName} ({review.reviewerCountry})</Text>
                            <Text style={styles.reviewStatus}>{review.reviewerStatus}</Text>
                            <View style={styles.reviewRating}>
                                <Rating
                                    type="star"
                                    ratingCount={5}
                                    imageSize={15}
                                    startingValue={pandit.rating}
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
                </View>
                <FlatList
                    data={imageData}
                    renderItem={({ item }) => (
                        <Image source={item} style={styles.images} />
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                <View style={styles.socialIcons}>
                    <SimpleLineIcons name={'social-facebook'} size={30} color={Colors.dark} />
                    <SimpleLineIcons name={'social-dribbble'} size={30} color={Colors.dark} />
                    <SimpleLineIcons name={'social-youtube'} size={30} color={Colors.dark} />
                    <SimpleLineIcons name={'social-instagram'} size={30} color={Colors.dark} />
                </View>
                <Image source={require('../../Images/slider.png')} />
            </ScrollView>
        </View>
    );
};

export default PanditDetailPage;
