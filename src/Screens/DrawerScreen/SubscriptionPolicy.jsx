import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';
import Globalstyles from '../../utils/GlobalCss';
import { DrawerActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SubscriptionPolicy = ({ navigation }) => {
     const insets = useSafeAreaInsets();
    return (
        <View style={[Globalstyles.container, { paddingBottom: SH(20) }]} edges={['top', 'bottom']}>
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Image source={require('../../Images/menu.png')} style={{ width: SW(30), height: SH(30) }} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Subscription Policy</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={[styles.content,{paddingBottom: insets.bottom + SH(10)}]} showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.heading}>Subscription Policy</Text>
                    <Text style={styles.text}>
                        Thank you for choosing our mobile app offering <Text style={styles.bold}>Astrology, Pooja, Spiritual</Text>, and <Text style={styles.bold}>Matrimony</Text> services. Please read the following subscription policy carefully before making any purchase:
                    </Text>

                    <Text style={styles.heading}>1. Subscription Purpose</Text>
                    <Text style={styles.text}>
                        Our subscription packages are solely for registration and access to our platform for a specific period, generally up to one year or as mentioned during the time of purchase. The subscription enables users to be listed or registered within the app and access relevant features according to their selected plan. It is important to understand that the subscription only provides platform access and does not include any guaranteed services or outcomes.
                    </Text>

                    <Text style={styles.heading}>2. No Guarantee of Leads or Business Offers</Text>
                    <Text style={styles.text}>
                        By purchasing a subscription, users acknowledge and accept that the subscription does not guarantee any leads, business inquiries, or responses from other users. The app and its operating company do not commit to or claim to provide any business generation, clientele growth, matchmaking results, or user interactions. All interactions and results depend entirely on user engagement and platform activity.
                    </Text>

                    <Text style={styles.heading}>3. Non-Refundable Policy</Text>
                    <Text style={styles.text}>
                        All subscription fees are strictly non-refundable. Once a subscription is purchased, the payment will not be refunded under any circumstances, including but not limited to dissatisfaction, technical issues, low user response, or misunderstanding of the subscription purpose. Users are advised to carefully read all details before proceeding with payment.
                    </Text>

                    <Text style={styles.heading}>4. Validity of Subscription</Text>
                    <Text style={styles.text}>
                        The subscription is valid only for the duration mentioned at the time of purchase. Subscriptions do not auto-renew, and it is the user’s responsibility to keep track of the validity period. Upon expiry, continued access will require a new subscription.
                    </Text>

                    <Text style={styles.heading}>5. User Profile Visibility</Text>
                    <Text style={styles.text}>
                        Profile visibility may depend on the selected subscription tier. While we strive to maintain fair exposure for all users, we do not guarantee equal visibility or promotion. Premium packages may include additional features, but none guarantee response or results.
                    </Text>

                    <Text style={styles.heading}>6. Changes to Subscription Plans</Text>
                    <Text style={styles.text}>
                        The company reserves the right to change, modify, or discontinue any subscription plan or pricing at its discretion without prior notice. Any such changes will not affect current active subscriptions but will apply to new purchases or renewals.
                    </Text>

                    <Text style={styles.heading}>7. Account Termination or Suspension</Text>
                    <Text style={styles.text}>
                        In cases of policy violation, misuse of the platform, or inappropriate behavior, the company holds the right to suspend or terminate user accounts without prior notice. No refunds will be issued in such cases.
                    </Text>

                    <Text style={styles.heading}>8. Acceptance of Terms</Text>
                    <Text style={styles.text}>
                        By subscribing, users confirm that they have read, understood, and agreed to all the terms outlined in this policy, as well as the general Terms & Conditions and Privacy Policy of the app.
                    </Text>

                    <Text style={styles.text}>
                        If you have any questions or concerns regarding this policy, please feel free to contact our support team through the app.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default SubscriptionPolicy;

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: SW(10),
        paddingBottom: SH(20),
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontFamily: 'poppins-Bold',
        fontSize: SF(13),
        marginBottom: SH(10),
    },
    heading: {
        fontSize: SF(14),
        fontFamily: 'Poppins-Medium',
        marginBottom: SH(10),
        color: Colors.theme_color,
    },
    text: {
        fontSize: SF(12),
        marginBottom: SH(10),
        fontFamily: 'Poppins-Regular',
    },
    bold: {
        fontFamily: 'Poppins-Bold',
    },
});
