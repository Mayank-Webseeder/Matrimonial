import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import Globalstyles from '../../utils/GlobalCss';
import { DrawerActions } from '@react-navigation/native';
import Colors from '../../utils/Colors';
import { SF, SH, SW } from '../../utils/Dimensions';
import { Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PrivacyPolicy = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[Globalstyles.container, { paddingBottom: SH(20) }]} edges={['top', 'bottom']}>
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Image source={require('../../Images/menu.png')} style={{ width: SW(30), height: SH(30) }} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Privacy Policy</Text>
                </View>
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: insets.bottom + SH(10), flexGrow: 1}}>
                <View>
                    <Text style={styles.heading}>Privacy Policy</Text>

                    <Text style={styles.sectionHeading}>1. Introduction</Text>
                    <Text style={styles.text}>
                        We, at Appwin info tech Proprietorship firm and our affiliated companies and business Ally are committed to respecting your online privacy and recognize appropriate protection and management of any personally identifiable information you share with us. This Privacy Policy ("Policy") describes how appwin info tech Proprietorship firm and our other platform like brahmin milan platform collects, uses, discloses and transfers personal information of users through its websites and applications, including through brahmin milan mobile application, website and online services like social media (collectively, the "Platform").
                    </Text>
                    <Text style={styles.text}>
                        This policy applies to those who visit the Platform, or whose information appwin info tech Proprietorship firm otherwise receives in connection with its services (such as contact information of individuals associated with appwin info tech including partners) (hereinafter collectively referred to as “Users”). For the purposes of the Privacy Policy, “You“ or “Your” shall mean the person who is accessing the Platform.
                    </Text>

                    <Text style={styles.sectionHeading}>2. We collect the following categories of personal information through various means:</Text>
                    <Text style={styles.text}>
                        We may gather personal details such as your name, email address, date of birth, mobile number, password, country, state, gender, current location, city, pin code, marital status, sub-caste, horoscope details, height, occupation, income, and more.
                        Upon signing up on the Platform, we collect your mobile number for verification purposes and to send you relevant marketing and promotional communications related to the Platform.
                        When you complete your profile, you have the option to share additional information, such as details about your personality, family, contact address, and other personal aspects, including content like photos. If you wish to add specific content, such as pictures or videos, you may grant us access to your camera or photo album. Some of the information you provide, such as your ethnic background, religious beliefs, sub-caste, or physical and mental health details, may be considered sensitive or special in certain jurisdictions. By sharing this information, you consent to its processing.
                        As a member or when setting up alerts on the Platform, we may contact you based on your preferences.
                        We collect standard matrimonial profile information, such as your name, contact details (email address, mobile number), date of birth, educational background, employment status, income, photographs, and other relevant data upon your registration.
                        We may gather information about the services you use and how you interact with them, including log and location data, when you access the services through the Platform.
                        If you participate in surveys or forms, we may collect personal details such as your name, age, contact information, preferences, etc.
                        For verification purposes, we may request documents like age, address, income, or identification documents to enhance the credibility of your profile and ensure the security of the Platform.
                        When you communicate with the Brahmin Milan Platform or interact with other users, including advertisers and partners, we collect information related to your communications and any content you provide.
                        Upon visiting the Platform, we use cookies to collect, store, and utilize technical information about your system and your interactions with the Platform.
                        If you access the Platform through a device, we may collect technical or other related information from that device, including its location.
                        To the extent permitted by law, Brahmin Milan may record and monitor communications with you to ensure compliance with legal and regulatory requirements and our internal policies. This may include recording phone conversations.
                        If you use our horoscope services, we may collect information about you and your partner, including but not limited to your name, gender, date and time of birth, city, state, country, and email address.
                        In the future, we may collect, process, and store your user ID associated with any social media accounts (such as Facebook or Google) that you use to connect with us or access our services.
                        This comprehensive collection allows us to offer you a more personalized and secure experience on our Platform.
                        By using your social media account to access the Platform or linking your social media account to our services, you consent to the collection, storage, and use of the information you provide through the social media interface, in accordance with this Privacy Policy. For further details on how your social media provider shares your information, please refer to their privacy policy and help centre.

                    </Text>

                    <Text style={styles.sectionHeading}>3. How Brahmin Milan Platform May Use Your Personal Information</Text>
                    <Text style={styles.text}>
                        We will always handle your personal data in a fair, reasonable, and lawful manner.

                        The way we use your personal data depends on how you interact with us. We may process your personal information for the following purposes:

                        Protecting our users and providing customer support.
                        Using automated systems to analyse your content, offering personalized search results, recommendations, and identifying suspicious profiles.
                        Sending alerts and emails, including match alerts, membership updates, kundli notifications, visitor alerts, new matches, contact alerts, photo requests, service updates, promotional emails, SMS alerts, and call notifications. (You can unsubscribe via the Alert Manager link on your profile.)
                        Processing your chats with other users to comply with legal obligations, monitor for offensive content, and ensure a safe environment.
                        Using data from cookies and other technologies (like pixel tags) to enhance your experience and improve our services. We ensure that sensitive information, such as race, religion, sexual orientation, or health, is not linked with cookie data when displaying ads.
                        Conducting market research and surveys to improve our products and services.
                        Sending marketing materials and promotions related to our products and services.
                        Highlighting successful match stories within the Platform.
                        Preventing and addressing illegal activities, including fraud, financial crimes, and violations of our Terms of Use.
                        Verifying identity and conducting due diligence checks, when necessary.
                        Establishing or defending legal rights in connection with any legal proceedings or seeking legal advice.
                        No mobile information will be shared with third parties for marketing or promotional purposes. We will not share opt-in data or consent information with third parties.
                        Ensuring platform security, network reliability, and maintaining backups for disaster recovery.
                        Please note that when you create a profile, certain details like your age, height, education, and income will be visible to all website visitors (excluding identifiable information such as your photo, name, or phone number).

                    </Text>

                    <Text style={styles.sectionHeading}>4. Cookies and Tracking Technologies</Text>
                    <Text style={styles.text}>
                        We use cookies and other tracking technologies on some of our web pages. A cookie is a small file that collects information about website activity and may store personal details you've previously provided. You can manage cookie settings in most browsers, including blocking or accepting them. If you choose to block or delete cookies, you may need to re-enter your login details to access certain parts of the Platform.

                        Tracking technologies may collect data such as IP addresses, browser types, operating systems, click patterns, and access times. These help us improve the Platform and enhance your website experience. We may also analyse non-personal information for trends and statistics.

                        For more details, please refer to our Cookie Policy.

                    </Text>

                    <Text style={styles.sectionHeading}>5. Legal Grounds for Processing</Text>
                    <Text style={styles.text}>
                        Consent: We may process your Personal Information with your consent, which is obtained at the time of collection. This only happens when required by data protection laws.

                        Compliance with Legal Obligation: We may process your Personal Information to fulfil legal obligations, such as responding to a court order or retaining records as required by law.


                    </Text>

                    <Text style={styles.sectionHeading}>6. Information Sharing and Disclosure with Third Parties</Text>
                    <Text style={styles.text}>
                        We may share your Personal Information with third-party service providers to help us deliver services on the platform, maintain our operations, and communicate with you about our products. These service providers help with tasks like program delivery, product support, and managing mailing lists.

                        We limit access to your Personal Information to employees who need it to perform their duties and improve our services.

                        We do not share, disclose, or transfer your Personal Information except in the following cases:

                        <Text style={[styles.text]}>
                            1. Affiliates and Group Companies: To support our internal business functions and provide services.

                            2. Legal Requirements: We may disclose your information to comply with subpoenas, court orders, legal processes, or when required to protect our legal rights, prevent fraud, or ensure safety.

                            3. Mergers or Acquisitions: In the event of a business transfer, such as a merger or sale, we may share your information with the involved parties.

                            4. Third-party Service Providers: We work with third parties to provide services on our behalf, maintain the platform, and communicate with you. We ensure these providers protect your Personal Information through confidentiality agreements.

                            5. Advertisers: Third-party advertisers may display ads on our platform. While we don’t share your Personal Information with them directly, they may infer details about you based on your interaction with the ads.

                            We do not transfer your Personal Information to third parties without your consent, unless required by law. If your information is transferred outside India, we ensure it is protected in accordance with applicable data protection laws.


                        </Text>
                    </Text>

                    <Text style={styles.sectionHeading}>7. Third-Party Content</Text>
                    <Text style={styles.text}>
                        The Platform may include links to external sites not covered by this Privacy Policy. These links may lead to advertisers, blogs, social networks, or other third-party services.

                        Brahmin Milan Platform does not control how your information is handled by these external sites. We advise you to review their privacy policies to understand how they use your personal data.

                    </Text>

                    <Text style={styles.sectionHeading}>8. Children</Text>
                    <Text style={styles.text}>
                        To use the Platform, you must be at least 18 years old, or older if required by local laws.

                        If you're under 18 or the legal age in your area, you must use the Platform with the supervision of a parent, legal guardian, or responsible adult.

                    </Text>

                    <Text style={styles.sectionHeading}>9. Retention of Personal Information</Text>
                    <Text style={styles.text}>
                        Brahmin Milan will retain your Personal Information only as long as necessary for its intended purpose or to meet legal, regulatory, or contractual obligations. After that, it will be deleted or archived as required by law.

                        You can delete your data by deleting your profile on the Platform. To do so, go to the side bar, select "Account & Settings," and then choose "Delete My Profile."

                    </Text>

                    <Text style={styles.sectionHeading}>10. Controlling Your Personal Information</Text>
                    <Text style={styles.text}>
                        You have the right to exercise your rights regarding your Personal Information as per applicable laws. Brahmin Milan allows you to keep your information accurate and up-to-date. If you wish to:

                        1. Correct, update, or rectify your information
                        2. Confirm if your information is being processed
                        3. Access or request data portability
                        4. Limit the sharing of your information with third parties

                        You can contact us using the details provided below. Please provide valid proof of identity to ensure your rights are respected.

                        For certain requests, you may need to contact the relevant authority according to data protection laws.

                        Brahmin Milan may charge a fee for excessive or unfounded requests, as permitted by law. Please note that these rights are not absolute and may be limited by applicable data protection laws.

                    </Text>

                    <Text style={styles.sectionHeading}>11. Confidentiality and Security</Text>
                    <Text style={styles.text}>
                        We prioritize the security and confidentiality of your personal information. Brahmin Milan has invested substantial resources to protect your data and ensures that any external service providers we work with meet the same security standards. Regardless of where your personal data is stored or transferred, we take all necessary measures to keep it secure. We comply with the Information Technology Act, 2000, and related rules to protect your privacy. Our physical, electronic, and procedural safeguards follow Indian laws to ensure your information remains secure. By accepting this Privacy Policy, you agree that our practices are adequate to protect your personal data.
                    </Text>

                    <Text style={styles.sectionHeading}>12. Social Media</Text>
                    <Text style={styles.text}>
                        Brahmin Milan maintains social media channels to engage with customers, monitor feedback, and improve its services. However, we ask that you do not share sensitive personal information through these platforms, including data on race, health, political beliefs, sexual orientation, or criminal history, as well as offensive content. We are not responsible for content posted on social media by anyone other than our employees.
                    </Text>

                    <Text style={styles.sectionHeading}>13. Changes to this Privacy Policy</Text>
                    <Text style={styles.text}>
                        Brahmin Milan may update this Privacy Policy at any time, with the changes taking effect from the date of publication.
                    </Text>

                    <Text style={styles.sectionHeading}>14. Disclaimer</Text>
                    <Text style={styles.text}>
                        The Brahmin Milan platform does not store any account-related information or credit/debit card details. The platform shall not be held liable for any loss or damage sustained by users due to the inadvertent or otherwise disclosure of any information related to the user’s account, credit cards, or debit cards during online transactions or payments for products and/or services offered through the platform.

                        If any personal information is shared by you with Brahmin Milan platform, which was not requested during registration (whether mandatory or optional), the platform will not be responsible for any information security breach or unauthorized disclosure related to such information.

                        If you have any queries regarding this Privacy Policy or the protection of your personal information, please contact Brahmin Milan platform’s Data Protection Officer/Grievance Officer at the details provided below:



                    </Text>

                    <Text style={styles.sectionHeading}>15. Data Protection Officer/Grievance Officer</Text>
                    <Text style={styles.text}>
                        For any complaints or grievances concerning the processing of your personal information, contact:
                        <Text style={styles.paragraph}>Appwin Info Tech (Proprietorship Firm), Indore</Text>
                    </Text>
                    <Text style={styles.text} onPress={() => Linking.openURL('mailto:brahminmilan.in@gmail.com')}>
                        📧 brahminmilan.in@gmail.com
                    </Text>
                    <Text style={styles.text} onPress={() => Linking.openURL('mailto:appwin.in@gmail.com')}>
                        📧 appwin.in@gmail.com
                    </Text>
                    <Text style={styles.text} onPress={() => Linking.openURL('https://www.appwin.in')}>
                        🌐 www.appwin.in
                    </Text>
                    <Text style={styles.text} onPress={() => Linking.openURL('https://www.brahminmilan.in')}>
                        🌐 www.brahminmilan.in
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SW(10),
        // paddingVertical: SH(15),
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: SF(18),
        fontFamily: 'Poppins-Bold',
        color: Colors.theme_color,
        // marginBottom: 15,
        // textAlign: 'center',
    },
    sectionHeading: {
        fontSize: SF(18),
        fontWeight: 'Poppins-Bold',
        marginTop: SH(15),
        marginBottom: SH(5),
        color: Colors.theme_color,
    },
    text: {
        fontSize: SF(13),
        lineHeight: SH(24),
        color: '#555',
        fontFamily: 'Poppins-Regular',
    },
});
