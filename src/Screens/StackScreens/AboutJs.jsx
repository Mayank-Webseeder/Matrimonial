import { StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView } from 'react-native';
import React from 'react';
import Globalstyles from '../../utils/GlobalCss';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';
import { DrawerActions } from '@react-navigation/native';

const AboutJs = ({ navigation }) => {
    return (
        <View style={Globalstyles.container}>
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <MaterialIcons name={"arrow-back-ios-new"} size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>About Us</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <Text style={styles.heading}>हमारे बारे में</Text>
                <Text style={styles.text}>ब्राह्मण मिलन ऐप में आपका स्वागत है, "Brahmin Milan" Appwin Info Tech द्वारा विकसित एक मोबाइल ऐप है, जिसका उद्देश्य ब्राह्मण समुदाय को तकनीक के माध्यम से एकजुट और सशक्त बनाना है। यह ऐप ब्राह्मण समाज की विशेष आवश्यकताओं को पूरा करने के लिए डिज़ाइन किया गया है।</Text>

                <Text style={styles.heading}>सेवाएँ</Text>
                <Text style={styles.text}>- <Text style={styles.bold}>विवाह सेवा:</Text> आप समुदाय के भीतर योग्य जीवनसाथी खोज सकते हैं।</Text>
                <Text style={styles.text}>- <Text style={styles.bold}>धर्मशालाओं की जानकारी:</Text> यात्रा और आयोजनों के लिए समुदाय की धर्मशालाओं की जानकारी प्राप्त कर सकते हैं।</Text>
                <Text style={styles.text}>- <Text style={styles.bold}>समिति के सदस्य:</Text> समुदाय के प्रमुख पदाधिकारियों और समिति सदस्यों से संपर्क कर सकते हैं।</Text>
                <Text style={styles.text}>- <Text style={styles.bold}>समाचार फीड्स:</Text> ब्राह्मण समुदाय से जुड़ी ताजा खबरों और घटनाओं की जानकारी पाएं।</Text>
                <Text style={styles.text}>- <Text style={styles.bold}>पंडित और ज्योतिषी:</Text> पूजन, अनुष्ठानों और ज्योतिषीय मार्गदर्शन के लिए विद्वान पंडितों और अनुभवी ज्योतिषियों से संपर्क कर सकते हैं।</Text>
                <Text style={styles.text}>- <Text style={styles.bold}>कथावाचक:</Text> आध्यात्मिक प्रवचनों के लिए प्रसिद्ध कथावाचकों की जानकारी प्राप्त कर संपर्क कर सकते हैं।</Text>
                <Text style={styles.text}>- <Text style={styles.bold}>सामाजिक कार्यकर्ता:</Text> ब्राह्मण समाज के उत्थान और एकता के लिए काम कर रहे सामाजिक कार्यकर्ताओं से संपर्क करें।</Text>

                <Text style={styles.text}>हमारा उद्देश्य परंपराओं को संरक्षित करना, आपसी जुड़ाव बढ़ाना और ब्राह्मण समुदाय को जानकारी और सेवाओं की सहज पहुंच के माध्यम से सशक्त बनाना है।</Text>

                <Text style={styles.heading}>हमारी दृष्टि (Vision)</Text>
                <Text style={styles.text}>"ब्राह्मण समुदाय को एकजुट, सशक्त और डिजिटल रूप से उन्नत बनाना, जहां परंपराएं और आधुनिकता साथ-साथ चलें।" हमारा सपना एक ऐसा मंच बनाना है जो ब्राह्मण समाज के हर व्यक्ति को आपस में जोड़ते हुए उनकी सांस्कृतिक, सामाजिक और आध्यात्मिक आवश्यकताओं को पूरा करे।</Text>

                <Text style={styles.heading}>हमारा मिशन (Mission)</Text>
                <Text style={styles.text}>- ब्राह्मण समुदाय के लिए "डिजिटल सेवाओं" का एक ऐसा केंद्र बनाना, जो विवाह, धर्मशालाओं, समाचार और धार्मिक गतिविधियों की जानकारी एक ही जगह प्रदान करे।</Text>
                <Text style={styles.text}>- ब्राह्मण समाज के पदाधिकारियों, पंडितों, ज्योतिषियों और कथावाचकों को आसानी से जोड़ने में मदद करना।</Text>
                <Text style={styles.text}>- समाज के हर वर्ग को एक ऐसा मंच प्रदान करना जो परंपरा को संरक्षित करते हुए सशक्त और जागरूक समुदाय का निर्माण करे।</Text>
                <Text style={styles.text}>- ब्राह्मण समुदाय की आवाज और गतिविधियों को देशभर में फैलाना और लोगों को समाज के उत्थान के लिए प्रेरित करना।</Text>
                <Text style={styles.text}>हम परंपरा और तकनीक के बीच का सेतु बनकर ब्राह्मण समाज के भविष्य को उज्जवल बनाने के लिए प्रतिबद्ध हैं।</Text>

                <Text style={styles.heading}>संपर्क करें</Text>
                <Text style={styles.text} onPress={() => Linking.openURL('tel:8871186630')}>📞 8871186630</Text>
                <Text style={styles.text} onPress={() => Linking.openURL('mailto:brahminmilan.in@gmail.com')}>
                    📧 brahminmilan.in@gmail.com
                </Text>
                <Text style={styles.text} onPress={() => Linking.openURL('mailto:appwin.in@gmail.com')}>
                    📧 appwin.in@gmail.com
                </Text>
            </ScrollView>
        </View>
    );
};

export default AboutJs;

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: SW(10),
        paddingBottom: SH(50)
    },
    heading: {
        fontSize: SF(16),
        fontFamily: "Poppins-Bold",
        marginBottom: SH(10),
        color: Colors.theme_color
    },
    text: {
        fontSize: SF(13),
        marginBottom: SH(10),
    },
    bold: {
        fontFamily: "Poppins-Bold"
    },
});
