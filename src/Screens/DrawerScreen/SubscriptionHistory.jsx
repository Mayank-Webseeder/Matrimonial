import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import Globalstyles from '../../utils/GlobalCss';
import Colors from '../../utils/Colors';
import { SF, SH, SW } from '../../utils/Dimensions';
import { SUBSCRIPTION_HISTORY } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SubscriptionHistory = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState('Pandit');
    const [subscriptionData, setSubscriptionData] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);

    useFocusEffect(useCallback(() => {
        GetsubscriptionHistory();
    }, []));

    const GetsubscriptionHistory = async () => {
        try {
            setIsLoading(true);
            setSubscriptionData([]);
            const token = await AsyncStorage.getItem('userToken');
            if (!token) { throw new Error('No token found'); }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const res = await axios.get(SUBSCRIPTION_HISTORY, { headers });

            const allSubscriptions = res.data.data.map(item => ({
                service: item.service,
                paymentDetails: item.paymentDetails,
                paymentDate: item.paymentDate,
                discountApplied: item.discountApplied,
                razorpayOrderId: item.razorpayOrderId,
            }));

            console.log('allSubscriptions', JSON.stringify(allSubscriptions));
            setSubscriptionData(allSubscriptions);
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error('Error fetching subscriptions:', errorMsg);

            const sessionExpiredMessages = [
                'User does not Exist....!Please login again',
                'Invalid token. Please login again',
                'Token has expired. Please login again',
            ];

            if (sessionExpiredMessages.includes(errorMsg)) {
                await AsyncStorage.removeItem('userToken');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AuthStack' }],
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const filteredData = subscriptionData.filter(
        (item) => item.service.serviceType === activeTab
    );

    const renderItem = ({ item }) => {
        const {
            service: {
                serviceType,
                amount,
                duration,
                trialPeriod,
                status,
                startDate,
                endDate,
                isTrial,
            },
            paymentDate,
            paymentDetails,
        } = item;

        const isExpired = status === 'Expired';

        return (
            <View style={[styles.card]}>
                <View style={styles.cardHeaderRow}>
                    {status && (
                        <Text
                            style={[
                                styles.statusText,
                                {
                                    backgroundColor: isExpired ? '#f44336' : '#04AA6D',
                                    color: 'white',
                                    paddingHorizontal: SW(5),
                                    paddingTop: SH(2),
                                    borderRadius: 5,
                                    alignSelf: 'flex-start',
                                    textAlign: 'center',
                                    fontSize: SF(11),
                                },
                            ]}
                        >
                            {status}
                        </Text>
                    )}
                    {amount !== undefined && (
                        <Text style={styles.amountText}>₹{amount}</Text>
                    )}
                </View>
                <View style={styles.cardRow}>
                    {(duration || isTrial) && (
                        <Text style={styles.durationText}>
                            Duration - {isTrial ? `${trialPeriod} days (Trial)` : `${duration} months`}
                        </Text>
                    )}
                    {paymentDate && (
                        <Text style={styles.dateText}>Payment: {formatDate(paymentDate)}</Text>
                    )}
                </View>

                {/* Bottom Row: Start & End Date */}
                <View style={styles.cardRow}>
                    {startDate && (
                        <Text style={styles.dateText}>From: {formatDate(startDate)}</Text>
                    )}
                    {endDate && (
                        <Text style={styles.dateText}>To: {formatDate(endDate)}</Text>
                    )}
                </View>

            </View>
        );

    };



    const tabs = ['Pandit', 'Jyotish', 'Kathavachak', 'Biodata'];

    return (
        <View style={styles.container} edges={['top', 'bottom']}>
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Image source={require('../../Images/menu.png')} style={{ width: SW(30), height: SH(30) }} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Subscription History</Text>
                </View>
            </View>

            <View style={{ width: '100%' }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.tabContainer,
                        { paddingLeft: SW(10), paddingRight: SW(10) },
                    ]}
                >
                    <View style={{ flexDirection: 'row', gap: SW(10) }}>
                        {tabs.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[
                                    styles.tabButton,
                                    activeTab === tab && styles.activeTabButton,
                                ]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === tab && styles.activeTabText,
                                    ]}
                                >
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>

            <View>
                <FlatList
                    data={filteredData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + SH(10), flexGrow: 1 }]}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No subscriptions found for {activeTab}.</Text>
                    }
                />
            </View>
        </View>
    );
};

export default SubscriptionHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContent: {
        paddingVertical: SH(10),
        paddingHorizontal: SW(10),
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: SH(12),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        gap: SW(10),
        // marginHorizontal: SW(10),
    },
    tabButton: {
        paddingVertical: SH(8),
        paddingHorizontal: SW(19),
        borderRadius: 5,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeTabButton: {
        backgroundColor: Colors.theme_color,
    },
    tabText: {
        fontSize: SF(14),
        color: '#000',
    },
    activeTabText: {
        color: '#fff',
        fontFamily: 'Poppins-Medium',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: SH(20),
        color: '#888',
        fontFamily: 'Poppins-Bold',
    },
    card: {
        backgroundColor: '#ffffff',
        paddingVertical: SH(16),
        paddingHorizontal: SW(10),
        borderRadius: 10,
        marginBottom: SH(5),
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SH(5),
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: SH(2),
    },
    statusText: {
        fontSize: SF(14),
        fontFamily: 'Poppins-Regular',
    },
    typeText: {
        fontSize: SF(14),
        fontFamily: 'Poppins-Regular',
    },
    amountText: {
        fontSize: SF(16),
        fontFamily: 'Poppins-Bold',
    },
    durationText: {
        fontSize: SF(14),
        fontFamily: 'Poppins-Regular',
        marginBottom: SH(4),
    },
    dateText: {
        fontSize: SF(12),
        fontFamily: 'Poppins-Regular',
        color: '#555',
        marginBottom: SH(2),
    },
    promocodeText: {
        fontSize: SF(12),
        fontFamily: 'Poppins-Regular',
        color: '#555',
        marginBottom: SH(2),
    },
    discountText: {
        fontSize: SF(12),
        fontFamily: 'Poppins-Regular',
        color: '#555',
        marginBottom: SH(2),
    },
    buyButton: {
        backgroundColor: Colors.theme_color,
        paddingVertical: SH(2),
        borderRadius: 6,
        alignItems: 'center',
        alignSelf: 'flex-end',
        paddingHorizontal: SW(10),
    },
    buyButtonText: {
        color: '#fff',
        fontSize: SF(12),
        fontFamily: 'Poppins-Medium',
    },
});
