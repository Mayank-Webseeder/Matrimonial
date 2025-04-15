import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions } from '@react-navigation/native';
import Globalstyles from '../../utils/GlobalCss';
import Colors from '../../utils/Colors';
import { SF, SH, SW } from '../../utils/Dimensions';

const SubscriptionHistory = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Pandit');

    const userData = {
        serviceSubscriptions: [
            {
                serviceType: 'Pandit',
                subscriptionType: 'Paid',
                startDate: '2025-01-01T00:00:00.000Z',
                endDate: '2025-04-01T00:00:00.000Z',
                status: 'Active',
                trialPeriod: 0,
                duration: 3,
                amount: 1000,
                discountApplied: 100,
                promocode: 'NEWYEAR2025',
                paymentDate: '2025-01-01T10:00:00.000Z',
            },
            {
                serviceType: 'Jyotish',
                subscriptionType: 'Trial',
                startDate: '2024-11-01T00:00:00.000Z',
                endDate: '2024-11-15T00:00:00.000Z',
                status: 'Expired',
                trialPeriod: 14,
                duration: 0,
                amount: 800,
                discountApplied: 0,
                promocode: null,
                paymentDate: '2024-11-01T10:00:00.000Z',
            },
            {
                serviceType: 'Biodata',
                subscriptionType: 'Trial',
                startDate: '2024-11-01T00:00:00.000Z',
                endDate: '2024-11-15T00:00:00.000Z',
                status: 'Expired',
                trialPeriod: 14,
                duration: 0,
                amount: 800,
                discountApplied: 0,
                promocode: null,
                paymentDate: '2024-11-01T10:00:00.000Z',
            },
            // Add more subscriptions as needed
        ],
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const filteredData = userData.serviceSubscriptions.filter(
        (item) => item.serviceType === activeTab
    );

    const renderItem = ({ item }) => {
        const {
            subscriptionType,
            amount,
            duration,
            trialPeriod,
            status,
            startDate,
            endDate,
            paymentDate,
            promocode,
            discountApplied,
        } = item;

        const isExpired = status === 'Expired';

        return (
            <View style={[styles.card, isExpired && styles.expiredCard, !isExpired && styles.ActiveCard]}>
                <View style={styles.cardHeader}>
                    <Text style={styles.statusText}>
                        Status: <Text style={{ color: isExpired ? 'red' : 'green' }}>{status}</Text>
                    </Text>
                    <Text style={styles.typeText}>Type: {subscriptionType}</Text>
                </View>

                <View style={styles.cardBody}>
                    <Text style={styles.amountText}>Amount: ₹{amount}</Text>
                    <Text style={styles.durationText}>
                        Duration: {subscriptionType === 'Trial' ? `${trialPeriod} days (Trial)` : `${duration} months`}
                    </Text>
                    <Text style={styles.dateText}>Start Date: {formatDate(startDate)}</Text>
                    <Text style={styles.dateText}>End Date: {formatDate(endDate)}</Text>
                    <Text style={styles.dateText}>Payment Date: {formatDate(paymentDate)}</Text>
                </View>

                {isExpired && (
                    <TouchableOpacity style={styles.buyButton} onPress={() => {/* Navigate to subscription purchase */ }}>
                        <Text style={styles.buyButtonText}>Buy Subscription</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };


    const tabs = ['Pandit', 'Jyotish', 'Kathavachak', 'Biodata'];

    return (
        <View style={styles.container}>
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Subscription History</Text>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
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

            <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No subscriptions found for {activeTab}.</Text>
                }
            />
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
        paddingHorizontal: SW(10)
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: SH(12),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tabButton: {
        paddingVertical: SH(8),
        paddingHorizontal: SW(16),
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
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
        fontFamily: "Poppins-Bold"
    },
    emptyText: {
        textAlign: 'center',
        marginTop: SH(20),
        color: '#888',
        fontFamily: "Poppins-Bold"
    },
    card: {
        backgroundColor: '#ffffff',
        paddingVertical: SH(16),
        paddingHorizontal: SW(16),
        borderRadius: 10,
        marginBottom: SH(12),
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    expiredCard: {
        borderWidth: 1,
        borderColor: 'red',
    },
    ActiveCard: {
        borderWidth: 1,
        borderColor: 'green',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SH(8),
    },
    statusText: {
        fontSize: SF(14),
        fontFamily: 'Poppins-Regular',
    },
    typeText: {
        fontSize: SF(14),
        fontFamily: 'Poppins-Regular',
    },
    cardBody: {
        marginBottom: SH(12),
    },
    amountText: {
        fontSize: SF(16),
        fontFamily: 'Poppins-Bold',
        marginBottom: SH(4),
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
        paddingVertical: SH(10),
        borderRadius: 6,
        alignItems: 'center',
    },
    buyButtonText: {
        color: '#fff',
        fontSize: SF(14),
        fontFamily: 'Poppins-Bold',
    },
});
