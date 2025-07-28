import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import { SW, SH, SF } from '../../utils/Dimensions';
import Colors from '../../utils/Colors';
import axios from 'axios';
import { FETCH_PLANS, PAID_URL, PAYMENT_VERIFICATION, PHOTO_URL, RAZORPAY } from '../../utils/BaseUrl';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const BuySubscription = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { serviceType } = route.params || {};
  console.log('Service Type:', serviceType);
  const [buyLoading, setBuyLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [buyingPlanId, setBuyingPlanId] = useState(null);
  const [plansLoading, setPlansLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchPlans();
    }, [fetchPlans])
  );


  const fetchPlans = async () => {
    try {
      setPlansLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      if (!token) { throw new Error('No token found'); }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${FETCH_PLANS}/${serviceType}`, { headers });
      if (response.data?.status) {
        console.log('plans', JSON.stringify(response.data.plans));
        setPlans(response.data.plans);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error('failed to fetch plans :', errorMsg);

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
      setPlansLoading(false);
    }
    finally {
      setPlansLoading(false);
    }
  };

  const handleBuyNow = async (plan) => {
    try {
      setBuyLoading(true);
      setBuyingPlanId(plan._id);
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) { throw new Error('Missing user token or ID'); }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const keyResponse = await axios.get(
        RAZORPAY,
        { headers }
      );

      const razorpayKey = keyResponse.data?.key;
      if (!razorpayKey) { throw new Error('Failed to fetch Razorpay Key'); }

      const payload = {
        userId,
        profileType: plan?.profileType,
        planId: plan?._id

      };
      console.log('📦 [Payload to /buy]:', payload);

      const orderResponse = await axios.post(
        PAID_URL,
        payload,
        { headers }
      );

      console.log('🧾 [Order API Response]:', orderResponse.data);

      let orderId, amount, currency;

      if (orderResponse.data?.razorpayOrder) {
        const razorpayOrder = orderResponse.data.razorpayOrder;
        orderId = razorpayOrder.id;
        amount = razorpayOrder.amount;
        currency = razorpayOrder.currency;
      }

      else if (orderResponse.data?.razorpayOrderId) {
        orderId = orderResponse.data.razorpayOrderId;
        amount = orderResponse.data.services?.[0]?.amount * 100 || 50000;
        currency = 'INR';
      }

      if (!orderId || !amount || !currency) {
        throw new Error('Incomplete Razorpay order data received from server');
      }

      const options = {
        description: `Subscription for ${plan.profileType}`,
        currency,
        key: razorpayKey,
        amount,
        name: 'Brahmin Milan',
        order_id: orderId,
        theme: { color: '#3399cc' },
      };

      RazorpayCheckout.open(options)
        .then(async (paymentData) => {
          console.log('[Payment Success]:', paymentData);

          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = paymentData;

          if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            Alert.alert('Error', 'Missing payment details from Razorpay.');
            return;
          }

          const verifyPayload = {
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            razorpay_signature: razorpay_signature,
          };

          console.log('📨 [Payload to /verifyPayment]:', verifyPayload);

          try {
            const verifyResponse = await axios.post(
              PAYMENT_VERIFICATION,
              verifyPayload,
              { headers }
            );

            console.log('[Verify Payment Response]:', verifyResponse.data);

            if (verifyResponse.status === 200 || verifyResponse.data?.status) {
              Alert.alert('Success',
                verifyResponse.data?.message || 'Payment verified successfully!', [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.navigate('MainApp', {
                      screen: 'Tabs',
                      params: {
                        screen: 'MyProfile',
                      },
                    });
                  },
                },
              ]);
            } else {
              Alert.alert('Warning', verifyResponse.data?.message || 'Verification failed!');
            }

          } catch (verifyError) {
            console.error('❌ [Verification Error]:', verifyError.response?.data || verifyError.message);
            Alert.alert('verification failed', 'Payment done, but verification failed.');
          }
        })
        .catch((error) => {
          console.log('[Payment Failed]:', error);
          Alert.alert(
            'Payment Failed',
            'Your payment could not be processed at the moment. No amount was deducted. Please try again.'
          );
        });

    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error('[Error in buying subscription]:', errorMsg);
      Alert.alert(
        'Subscription Info',
        errorMsg
      );

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
      setBuyLoading(false);
      setBuyingPlanId(null);
    }
    finally {
      setBuyLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    }
  };

  // if(plansLoading){
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color={Colors.theme_color} />
  //     </View>
  //   );
  // }

  return (
    <View style={Globalstyles.container} edges={['top', 'bottom']}>
      <View style={Globalstyles.header}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={[Globalstyles.headerText, { textAlign: 'left' }]}>Buy Subscription</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + SH(10), flexGrow: 1 }}>
        <View style={styles.cardContainer}>
          {plansLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: SH(20) }}>
              <ActivityIndicator size="large" color={Colors.theme_color} />
            </View>
          ) : (
            plans.map((plan) => (
              <View key={plan._id} style={styles.card}>
                {plan.photoUrl ? (
                  <Image
                    source={{ uri: plan.photoUrl }}
                    style={styles.planImage}
                    resizeMode="cover"
                    onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
                  />
                ) : null}

                {/* Title and Description */}
                <View style={styles.cardContent}>
                  {plan.trialPeriod ? (
                    <Text style={styles.Text}>
                      <Text style={styles.boldLabel}>Trial Period: </Text>
                      {plan.trialPeriod} days
                    </Text>
                  ) : null}

                  {plan.duration ? (
                    <Text style={styles.Text}>
                      <Text style={styles.boldLabel}>Duration: </Text>
                      {plan.duration} months
                    </Text>
                  ) : null}

                  {plan.amount ? (
                    <Text style={styles.Text}>
                      <Text style={styles.boldLabel}>Amount: </Text>
                      ₹{plan.amount}
                    </Text>
                  ) : null}

                  {plan.description ? (
                    <Text style={styles.description}>{plan.description}</Text>
                  ) : null}

                  <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => handleBuyNow(plan)}
                  >
                    <Text style={styles.buyButtonText}>
                      {buyingPlanId === plan._id ? 'Buying...' : 'Active Now'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BuySubscription;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // paddingHorizontal: SW(10),
    paddingBottom: SH(20),
  },
  card: {
    width: '95%',
    backgroundColor: Colors.light,
    borderRadius: 12,
    margin: SW(10),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  planImage: {
    width: '100%',
    height: SH(200),
  },
  cardContent: {
    paddingHorizontal: SW(12),
    paddingVertical: SH(5),
  },
  title: {
    fontSize: SF(16),
    fontFamily: 'Inter-Bold',
    color: Colors.theme_color,
    marginBottom: SH(4),
  },
  Text: {
    fontSize: SF(13),
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  description: {
    fontSize: SF(12),
    marginTop: SH(6),
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  buyButton: {
    backgroundColor: Colors.theme_color,
    paddingVertical: SH(8),
    marginTop: SH(10),
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: SF(14),
    fontWeight: '600',
  },
  closeButton: {
    // backgroundColor:Colors.theme_color,
    borderRadius: 5,
    paddingHorizontal: SW(10),
    paddingVertical: SH(5),
    alignItems: 'center',
    marginTop: SH(10),
  },
  closeText: {
    color: Colors.theme_color,
    fontFamily: 'Poppins-Bold',
    fontSize: SF(13),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SH(12),
  },
  buyButton: {
    backgroundColor: '#866fe7',
    paddingHorizontal: SW(10),
    paddingVertical: SW(5),
    borderRadius: 10,
    flex: 1,
    marginRight: SW(5),
    alignItems: 'center',
    marginVertical: SH(10),
  },
  buyButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: SF(14),
  },
  trialButton: {
    backgroundColor: '#666266',
    paddingHorizontal: SW(10),
    paddingVertical: SW(5),
    borderRadius: 10,
    flex: 1,
    marginRight: SW(5),
    alignItems: 'center',
  },
  trialText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: SF(15),
  },
  buttonRowAligned: {
    marginTop: SH(10),
  },
});
