import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useCallback, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import { SW, SH, SF } from '../../utils/Dimensions';
import Colors from '../../utils/Colors';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { FETCH_PLANS, PAID_URL, PAYMENT_VERIFICATION, RAZORPAY } from '../../utils/BaseUrl';

const BuySubscription = ({ navigation, route }) => {
  const { serviceType } = route.params;
  console.log("Service Type:", serviceType);
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
      setPlansLoading(true)
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${FETCH_PLANS}/${serviceType}`, { headers });
      if (response.data?.status) {
        setPlans(response.data.plans);
      }
    } catch (error) {
      console.error('Failed to fetch plans:', error);
      setPlansLoading(false)
    }
    finally {
      setPlansLoading(false)
    }
  };

  const handleBuyNow = async (plan) => {
    try {
      setBuyLoading(true)
      setBuyingPlanId(plan._id);
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      if (!token || !userId) throw new Error("Missing user token or ID");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const keyResponse = await axios.get(
        RAZORPAY,
        { headers }
      );

      const razorpayKey = keyResponse.data?.key;
      if (!razorpayKey) throw new Error("Failed to fetch Razorpay Key");

      const payload = {
        userId,
        profileType: plan.profileType
      };
      console.log("📦 [Payload to /buy]:", payload);

      const orderResponse = await axios.post(
        PAID_URL,
        payload,
        { headers }
      );

      console.log("🧾 [Order API Response]:", orderResponse.data);

      let orderId, amount, currency;

      // Case 1: New order created
      if (orderResponse.data?.razorpayOrder) {
        const razorpayOrder = orderResponse.data.razorpayOrder;
        orderId = razorpayOrder.id;
        amount = razorpayOrder.amount;
        currency = razorpayOrder.currency;
      }
      // Case 2: Old subscription exists (and message says 'Subscription created...')
      else if (orderResponse.data?.razorpayOrderId) {
        orderId = orderResponse.data.razorpayOrderId;
        amount = orderResponse.data.services?.[0]?.amount * 100 || 50000;
        currency = "INR";
      }

      if (!orderId || !amount || !currency) {
        throw new Error("Incomplete Razorpay order data received from server");
      }

      const options = {
        description: `Subscription for ${plan.profileType}`,
        image: 'https://yourapp.com/logo.png',
        currency,
        key: razorpayKey,
        amount,
        name: 'Matrimonial',
        order_id: orderId,
        theme: { color: '#3399cc' },
      };

      RazorpayCheckout.open(options)
        .then(async (paymentData) => {
          console.log("💸 [Payment Success]:", paymentData);

          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = paymentData;

          if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            Alert.alert("Error", "Missing payment details from Razorpay.");
            return;
          }

          const verifyPayload = {
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            razorpay_signature: razorpay_signature,
          };

          console.log("📨 [Payload to /verifyPayment]:", verifyPayload);

          try {
            const verifyResponse = await axios.post(
              PAYMENT_VERIFICATION,
              verifyPayload,
              { headers }
            );

            console.log("✅ [Verify Payment Response]:", verifyResponse.data);

            if (verifyResponse.status === 200 || verifyResponse.data?.status) {
              Alert.alert("Success",
                verifyResponse.data?.message || "Payment verified successfully!", [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate("MyProfile");
                  },
                },
              ]);
            } else {
              Alert.alert("Warning", verifyResponse.data?.message || "Verification failed!");
            }

          } catch (verifyError) {
            console.error("❌ [Verification Error]:", verifyError.response?.data || verifyError.message);
            Alert.alert("Error", "Payment done, but verification failed.");
          }
        })
        .catch((error) => {
          console.log("❌ [Payment Failed]:", error);
          Alert.alert("Payment Failed", error.description || "Try again later.");
        });

    } catch (error) {
      const errorMsg = error?.response?.data?.message || error.message || "Please try again later.";

      console.error("❌ [Error in buying subscription]:", error?.response?.data || error.message);
      Alert.alert(
        "Subscription Info",
        errorMsg
      );
      setBuyLoading(false)
      setBuyingPlanId(null);
    }
    finally {
      setBuyLoading(false)
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
    <View style={Globalstyles.container}>
      <View style={Globalstyles.header}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={[Globalstyles.headerText, { textAlign: "left" }]}>Buy Subscription</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          {plansLoading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: SH(20) }}>
              <ActivityIndicator size="large" color={Colors.theme_color} />
            </View>
          ) : (
            plans.map((plan) => (
              <View key={plan._id} style={styles.card}>
                <Text style={styles.title}>{plan.profileType}</Text>
                <Text style={styles.Text}>Trial Period: {plan.trialPeriod} days</Text>
                <Text style={styles.Text}>Duration: {plan.duration} months</Text>
                <Text style={styles.Text}>Amount: ₹{plan.amount}</Text>

                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Text style={styles.description}>{plan.description}</Text>
                  <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => handleBuyNow(plan)}
                  >
                    <Text style={styles.buyButtonText}>
                      {buyingPlanId === plan._id ? "Buying..." : "Active Now"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <Toast />
    </View>
  )
}

export default BuySubscription

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // paddingHorizontal: SW(10),
    paddingBottom: SH(20),
  },
  card: {
    marginHorizontal: SW(10),
    backgroundColor: '#e8dae8',
    borderRadius: SW(12),
    overflow: 'hidden',
    marginVertical: SH(10),
    paddingHorizontal: SW(10),
    paddingVertical: SH(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: SF(18),
    fontFamily: "Poppins-Bold",
    marginBottom: SH(5),
    color: Colors.theme_color,
    textAlign: "center"
  },
  Text: {
    fontSize: SF(12),
    color: Colors.light,
    marginTop: SH(5),
    fontFamily: "Poppins-Regular",
    color: Colors.dark,
  },
  description: {
    fontSize: SF(12),
    color: Colors.light,
    marginTop: SH(10),
    fontFamily: "Poppins-Regular",
    color: Colors.dark,
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
    fontFamily: "Poppins-Bold",
    fontSize: SF(13)
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
    marginVertical: SH(10)
  },
  buyButtonText: {
    color: 'white',
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    fontSize: SF(14)
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
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    fontSize: SF(15)
  },
  buttonRowAligned: {
    marginTop: SH(10),
  },
})