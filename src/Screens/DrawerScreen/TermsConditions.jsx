import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import React from 'react';
import Globalstyles from '../../utils/GlobalCss';
import { DrawerActions } from '@react-navigation/native';
import { SF, SH, SW } from '../../utils/Dimensions';
import Colors from '../../utils/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TermsConditions = ({ navigation }) => {
     const insets = useSafeAreaInsets();
    return (
        <SafeAreaView style={[Globalstyles.container, { paddingBottom: SH(20) }]} edges={['top', 'bottom']}>
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Image source={require('../../Images/menu.png')} style={{ width: SW(30), height: SH(30) }} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Terms & Conditions</Text>
                </View>
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: insets.bottom + SH(10), flexGrow: 1}}>
                <View>
                    <Text style={styles.heading}>Terms and Conditions</Text>
                    <Text style={styles.paragraph}>
                        Please read these Terms and Conditions carefully. Brahmin Milan (the "Site") and the mobile application licensed to access the website (including all related media and online or electronic documentation) (the "Mobile Application"), are owned and operated by Appwin Info Tech (the "Proprietorship Firm"). The website and mobile application are hereinafter collectively referred to as "Brahmin Milan".
                    </Text>
                    <Text style={styles.paragraph}>
                        1. Appwin Info Tech makes its services and products available to you through Brahmin Milan on the condition that you will comply with these Terms and Conditions as updated from time to time. If you do not do so or you do not comply with these provisions, you must not use or access Brahmin Milan.
                    </Text>
                    <Text style={styles.paragraph}>
                        2. Brahmin Milan application is an intermediary as defined under sub-section (w) of section 2 of the Information Technology Act, 2000. Visitors to this Platform are granted a non-exclusive, limited license to use and access the content and services offered in accordance with these Terms and Conditions ("License").
                    </Text>
                    <Text style={styles.paragraph}>
                        3. A visitor to the Platform, whether or not he or she has made any payment to access and/or obtain services on the Brahmin Milan Platform, including through a normal browser of the Brahmin Milan Platform, whether registered or not, is hereinafter referred to as the "User/Users".
                    </Text>
                    <Text style={styles.paragraph}>
                        It is generally understood that if a person creates a profile for another person on the Brahmin milan Platform, the person creating the profile has obtained the implied consent of the person on whose behalf he/she is acting to create such profile. However, the person whose profile has been created has the right to request removal of his/her profile at any time. Please note that the Company/Platform does not encourage the creation of profiles without explicit consent and reserves the right to deny access to the brahmin milan Platform.
                    </Text>
                    <Text style={styles.paragraph}>
                        4.	The Brahmin milan Platform is owned and operated by Appwin info tech Proprietorship firm, which, for the purposes hereof, shall be deemed to include its subsidiaries, affiliates, partners, shareholders, directors, executives, officers, employees, agents, attorneys, accountants and any person vested with any responsibility for any act relating to the affairs of the firm, whose registered office is presently situated at Niranjanpur near dewas naka indore 452010.  The Brahmin Milan Platform is intended only to act as an initial medium of contact and information for Users who have the genuine intention of entering into a matrimonial alliance ("Purpose") and to connect with the Brahmin Samaj and to perform social work for the Brahmin Samaj. The Platform does not claim to be a matrimonial or business bureau or a dating/contact website.
                    </Text>
                    <Text style={styles.paragraph}>
                        5.	For more information on the information we collect from Users and how we share it with Users, please follow the steps below:
                    </Text>
                    <Text style={styles.paragraph}>
                        Brahmin milan collects information/data usage from Users, and discloses your personal information including, without limitation, e-mail id, address, first name, last name, telephone/mobile number, date of birth, age, gender, ethnic/cultural background, appearance, religion, occupation, preferences, lifestyle information, general geographic location ("User Data") to enable them to create their profiles on the Platform. In addition, certain other health-related information including physical and mental disabilities is also collected. Brahmin milan does not collect financial information of Users such as credit card/debit card number/bank account number etc. If the required User Data is not provided by the User, Brahmin milan will not be able to provide access to the Platform and/or create Users' profiles. The User consents to the use of his/her User Data to be displayed to other Users on the Platform.
                    </Text>
                    <Text style={styles.paragraph}>
                        6.	Users allow us to use information about the activities and actions they take on the Platform in connection with advertisements, offers and other sponsored content displayed by Appwin info tech on the Brahmin milan Platform, without any charge to the Users. Appwin info tech uses data and information about Users to make relevant suggestions and recommendations to its Users.
                    </Text>
                    <Text style={styles.paragraph}>
                        7.	The Brahmin milan Platform uses various third-party apps to provide a comprehensive user experience. By using the Platform, you acknowledge and agree that you may be subject to the terms and privacy policies of these third-party apps. It is your responsibility to review these policies before using any linked services.
                    </Text>
                    <Text style={styles.paragraph}>
                        8.	When you create a profile on the Brahmin milan Platform, certain anonymous details may be visible to external visitors. This information does not include any personally identifiable information (PII), unless you explicitly choose to share it. You can control what information is displayed and visible through your account settings.
                    </Text>
                    <Text style={styles.paragraph}>
                        User data is uploaded by the Users themselves or through any of the Brahmin milan & brahmin milan activists displayed on the Platform. Brahmin milan, at its sole discretion, may include all or any part of the list reported by the User in any other media for display on the Platform, including but not limited to print media, community associations, websites, television shows, DTH/IPTV services, mobile wap sites etc. There will be no additional cost to the Users and brahmin milan & Appwin info tech shall not be liable for the use/dissemination of such information/data.
                    </Text>
                    <Text style={styles.paragraph}>
                        9.	Users undertake not to copy, download, publish, modify and distribute the Content on the Platform, unless specifically authorized in writing by brahmin milan app. Users undertake not to establish any deep link or other connection to a specific page of the Platform without obtaining the prior written consent of brahmin milan app. Users undertake to use the Platform for their personal purposes. It is strictly prohibited to use the Content from the Platform to create derivative works for any commercial purpose without the prior written consent of Brahmin milan platform. The firm takes measures including technical means on the Platform to prevent robots, scripts, programs, etc. from crawling or scraping the Platform. Any advice, consultation, recommendations or information provided on the Platform, including Users' information, may not necessarily be correct, truthful or reliable, and any reliance placed thereon and any action taken on the basis thereof shall be entirely/solely at the risk of the respective User. Users are advised to conduct their own due diligence with respect to the Content present on the Platform at their own initiative, cost and effort.  Brahmin milan platform does not advise/recommend any User to establish any contact/interaction with other Users or do so based on the data/information provided in such User's profile/photograph etc. and the User choosing to make contact or interact will do so entirely at his/her own risk. Brahmin milan app or Appwin info tech cannot be held responsible or liable in any manner in respect of any reliance placed on any information displayed/placed on the Platform.
                    </Text>
                    <Text style={styles.paragraph}>
                        10.	Brahman Milan does not authenticate, investigate, screen, endorse or verify any information or claim contained in any other content on the Platform, nor does it in any way warrant or verify it to be correct or true. It does not endorse the matches and profiles in any way, but an implicit assumption is cast on the Users that the information provided is exclusively/solely for the purpose of tailoring a suitable profile for the purpose of matrimonial alliance based on the partner preference criteria set by the Users. All due diligence, effort and initiative should be taken by those wishing to use any information found on the Platform, and adequate caution should be exercised with full knowledge that all information contained in the matrimonial listings and other options such as news, dharamshalas, pandits, astrologers, storytellers, committees, information received through other notifications etc. is placed there directly by the Users of the Platform without any prior notice, consent or verification by Brahman Milan Platform.
                    </Text>
                    <Text style={styles.paragraph}>
                        11.	Users of the Brahman Milan Platform are prohibited from uploading, posting, transmitting, updating or sharing any information that: belongs to another person and to which the User has no right; is grossly harmful, political, pro or anti political party, pro or anti politician, racist, harassing, blasphemous, abusive, obscene, pornographic, pedophilic, defamatory, invasive of another’s privacy, hateful, or racially, ethnically objectionable, abusive, relates to or encourages money laundering or gambling, or is unlawful in any way; harms minors in any way; infringes any patent, trademark, copyright or other proprietary rights; violates any laws for the time being in force; deceives or misleads the recipient about the origin of such messages or communicates any information that is grossly offensive or menacing in nature; impersonates another person;  contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of the Platform; threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign States, or public order or incites the commission of any cognizable offence or prevents investigation of any offence or insults any other nation.
                    </Text>
                    <Text style={styles.paragraph}>
                        12.	Brahmin Milan Platform may, in its sole discretion, without notice and at any time, terminate or restrict a User's use or access to the Platform (or any part thereof) and/or remove any Content uploaded by a User for any reason, including without limitation, if Brahmin Milan Platform believes in its sole judgment and belief that the User has violated or acted inconsistently with the letter or spirit of these Terms. Brahmin Milan Platform provides Brahmin Milan Mobile App and Website as an electronic platform for the Brahmin community to gather but does not endorse or condone any casteism, Brahminism, racism, communalism, linguism or any other form of discrimination by any User.
                    </Text>
                    <Text style={styles.paragraph}>
                        13.	The Platform does not share User Data with other Users or third parties without the User's prior consent. Although the Platform will take all reasonable precautions, the Platform shall not be responsible in case such User Data is unauthorizedly copied/printed/published/forged/attributed/manipulated etc. or misused by any User on the Platform. The User shall indemnify Brahman Milan Platform against all losses/damages that may arise from any activity done by them through improper use of the Platform/Service provided by Appwin info tech.  By posting a matrimonial profile, or business or personal listing or link, or listing any content or listing on the Platform, the respective User creating or posting such listing and the person or persons responsible for such posting or listing shall be deemed to have agreed to indemnify and hold harmless Appwin Info Tech from and against any suit or complaint, civil, economic or criminal, and any claims or damages (including, without limitation, interest, fines and penalties) that may be brought against or imposed upon Appwin Info Tech by reason of any matter arising out of or relating to such posting/listing or feedback received from such posting/listing. Users are under an obligation to provide only true and correct information when using the Platform and in the case of creating a profile, Users undertake to keep the information updated at all times. Brahman Milan Platform does not represent or endorse the accuracy or reliability of any member/visitor profile, advice, opinion, statement or other information displayed/uploaded through the Service by the Platform.
                    </Text>
                    <Text style={styles.paragraph}>
                        14.	Appwin info tech or any of its owners, employees or agents is not responsible under any circumstances for any action/performance that results from the online display of information in the nature of illegal content/material that may be offensive to visitors/members or is patently offensive to the online community or any material that may promote racism, bigotry, hatred or physical/mental harm of any kind to any group or individual or any chain letters or junk mail or unsolicited mass mailing or spamming or obscene material to other users/members. The platform does not monitor the conduct of users and therefore Brahman Milan platform does not take responsibility for any conduct of users who may avail/access/use the online service provided by Brahman Milan platform to harass, abuse or harm another user.
                    </Text>
                    <Text style={styles.paragraph}>
                        Websites to which links are given on the Platform and the contents thereof are the sole responsibility of the promoters of such websites and Company does not, in any manner whatsoever, recommend, authenticate, endorse, verify or certify these websites or any contents or links there. Brahmin milan platform does not take any responsibility for the privacy practice adopted by such other websites and therefore Company recommends Users to read the privacy statement of each and every website that they visits. Brahmin milan platform also does not take any responsibility or endorse the authenticity of the other online services displayed on the Platform which may offer various services like a lucky draw, win a free trip, win free tickets, astrology, palmistry, numerology etc. User of the Platform shall at its sole risk and responsibility click and surf on to such other website(s) / links which is/are being displayed on the Platform. Users shall always bear in mind that at a single stroke/click of the mouse on such links/website, it gets connected through the Transmission Control Protocol (TCP) / Internet Protocol (IP) network of the said Users and not through the IP of the Platform. Company also does not suggest/encourage Users to furnish personal information and specially the Profile ID / User Name of the User on the Platform to such or any other website(s).
                    </Text>
                    <Text style={styles.paragraph}>
                        16.	The firm hereby specifically disclaims any liabilities or warranties or guarantees, express, specific or implied, which may be attributable, in any manner whatsoever, to the existence, promotion, canvassing, contents, links, information or discontinuance of the Platform. No claims for damages, restitution, loss-of-profits, or any other pecuniary, civil or criminal plaints, which may be said to arise out, or on account, of any matter contained or related to the Platform, shall lie or be deemed to be sustainable against Company.
                    </Text>
                    <Text style={styles.paragraph}>
                        17.	Firm reserves the right to tie up with partners in future to come up with various other online services. However, Company shall never share the information / data collected from Users with such other partners without taking prior consent / permission from such Users.
                        Firm assumes no responsibility for any error, omission, interruption, deletion, defect, delay in operation or transmission, communications line failure, theft or destruction or unauthorized access to, or alteration of User communications. Firm is not responsible for any problems or technical malfunction of any telephone network or lines, computer online systems, servers or providers, computer equipment, software, failure of e- mail or players on account of technical problems or traffic congestion on the internet or at any website or combination thereof, including injury or damage to Users or to any other person's computer related to or resulting from participating or downloading materials /information from the Platform.

                    </Text>
                    <Text style={styles.paragraph}>
                        18.	The firm does not take the responsibility of any information posted by its Users on the Platform, any copyrighted material, trademarks, or other proprietary information without obtaining the prior written consent of the owner of such proprietary rights and in case Company receives/discovers any such infringement, the said User may be called for / asked to furnish / provide evidence / relevant information in support of such display like an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest or a description of the copyrighted work that may have been infringed or information or a written statement that the User under bona-fide faith belief that the disputed information does not lead to any authorized use or infringement of copyright etc, under the law or a statement that the User is liable to penalty of perjury in case any of the information/statement furnished is proved otherwise or a declaration that the information displayed/posted is accurate and the User is itself the copyright owner or authorized to act on the copyright owner's behalf.
                    </Text>
                    <Text style={styles.paragraph}>
                        19.	The firm has no obligation to monitor the activities of its Users. However, Company has the right to monitor the Platform electronically from time to time and to disclose any information as necessary to satisfy any law, regulation or other governmental request, to operate the Platform properly, or to protect itself or its Users.
                    </Text>
                    <Text style={styles.paragraph}>
                        The usage of this Platform and any disputes/issues arising out of it shall be subject to the applicable laws in force for the time being in the NCT of Madhya Pradesh irrespective of conflicting provisions of law and to the exclusive jurisdiction of courts located in madhya pradesh.
                    </Text>
                    <Text style={styles.paragraph}>
                        The firm reserves the right to remove/erase any content/message/photo/profile or cancel the registration/membership of the User upon any complaint received from any other User or after its own discovery or based on its sole judgment and assumption and it shall stop providing the entitled Service to the User without any notice and forfeit all other incidental services with immediate effect along with the registration fee/period and also take appropriate legal action against such User. By listing a profile on the Platform, it is presumed that the said User has the intention to marry and join the Brahman Samaj and if the firm finds that such User at the time of listing the profile or subsequently had no intention to enter into a matrimonial alliance or did not intend to join the Brahman Samaj or has changed his/her intention, the firm reserves the right to remove/erase such profile from the Platform and initiate prosecution under law or take such steps as may be advised from time to time.
                    </Text>
                    <Text style={styles.paragraph}>
                        20.	By using the Platform, it is assumed that the User agrees not to post any material or opinion that could be construed as threatening, abusive, obscene, pornographic or otherwise objectionable or act illegally or harass any other user; insert false or misleading information in any details of your own profile; impersonate another or use the Site for any commercial purposes; or interfere or disrupt the operation of this Site, or violate any reasonable requirements, procedures or policies imposed by the firm from time to time. Nothing contained in the contents of the Platform is intended or is intended to induce, persuade or persuade or invite any person to perform any action or to do anything, or to perform or not to perform any act where such performance or not to do, or non-performance or not to do, violates any law or regulation for the time being in force to which such person or action may be governed.  The firm shall not be responsible for any interaction/transfer of information etc. between any User with any other User through e-mail, chat or any other means and the firm is not obliged to monitor any such dispute that may arise between the Users and the Company shall not be a party to such dispute/litigation etc. The Company reserves the absolute right to modify, alter or remove any content of any matrimonial listing placed on the Platform to ensure compliance with the rules of such placement (which may include, without limitation, efforts and initiatives by the appwin info tech to maximize response to matrimonial listings), prima facie accuracy and compliance with currently applicable laws, particularly those relating to the prohibition of any indecent, unlawful or obscene material. If a Member refuses to consent to physical address verification requested by the appwin info tech, the firm shall have the absolute right to stamp the profile as "Not Verified" or delete the profile.
                    </Text>
                    <Text style={styles.paragraph}>
                        21.	 All members of Platform are restricted to the following number of contacts they can make via the "Express Interest" option on the Platform.
                    </Text>
                    <Text style={styles.paragraph}>
                        All members of Platform are restricted to the following number of contacts they can make via the "Express Interest" option on the Platform.
                    </Text>
                    <Text style={styles.paragraph}>
                        Daily Limit	50
                    </Text>
                    <Text style={styles.paragraph}>
                        Weekly Limit	150
                    </Text>
                    <Text style={styles.paragraph}>
                        Monthly Limit	400
                    </Text>
                    <Text style={styles.paragraph}>
                        22.	In case Company receives any incriminating evidence/complaint against any User from other Users of the Platform or if Company, through data available to it from its servers, suspects misbehavior on any User’s part, it reserves the right to impose restrictions on the User’s account which include but may not be confined to preventing the User under question from making multiple contacts and restricting the user to only contact members whose desired partner profile the User satisfies.Company guidelines prohibit members to give their name and/or contact details in any form - Email, Phone nos., Messenger Ids, Postal address etc in any fields other than the specific ones where the same information is asked. If any member who puts the above information in any field other than the one meant for that purpose then the Company screening team will remove the same.
                    </Text>
                    <Text style={styles.paragraph}>
                        Users of the Platform are consenting for receiving
                        Emails conveying the benefits of paid membership to Users. These are sent to the Email address mentioned by the Users in their profile.
                    </Text>
                    <Text style={styles.paragraph}>
                        Important Notifications from the Platform – Messages/notifications are sent to Users to inform them of various alerts related to usage of the Platform. . These will be communicated to the Users by Email/app notifications etc. or on their Mobile via SMS/Calls etc.
                        SMSes or phone calls shall be sent conveying the benefits of paid membership to Users. Users will receive these calls or SMS on any of the phone numbers mentioned by Users on their profile, if they have subscribed to calls/ SMS in their alert manager settings.
                        Promotional emails can be sent to members on their Email ids, if they have subscribed to promotional emails in their alert manager settings.

                    </Text>
                    <Text style={styles.paragraph}>
                        23.	Brahmin milan platform does not warrant that the Platform will be uninterrupted or error-free. platform provides the service on an "as is" basis. However, plateform will take all reasonable steps to provide its users with error free, uninterrupted user experience. There may be delays, omissions, and interruptions in the availability of the Platform. Users acknowledge that use of the Platform is solely at their cost and risk. Brahmin milan platform is not responsible for suspension of the services on the Platform, irrespective of the reason for such interruption / suspension. Company may discontinue or change the services on the Platform or its availability at any time, and the User is also free to stop availing the services on the Platform at any time.
                        The firm uses third party payment gateways on the Platform and failures in these gateways would be communicated to the users as it is. Extra currency/conversion charges/deductions/error issues from payment gateway shall not be the responsibility of the Company.
                        The firm has complete rights in the Platform and the services provided thereunder. The Platform contains to the extent protected by applicable laws, copyrighted material, trademarks, and other proprietary information of its owners and its licensors. Except for that information which is in the public domain or for any other information/display for which permission have not been obtained from Company, Company reserves the right to proceed/initiate appropriate steps under the prevailing law against infringement of the said proprietary rights for illegal copying, modifying, publishing, transmitting, distributing, performing, displaying, or selling of any such proprietary information.

                    </Text>
                    <Text style={styles.paragraph}>
                        24.	The firm reserves the right to verify the authenticity of Content posted on the site. Company if circumstances warrant may call for / ask any of its Users to provide documentary or other form of evidence supporting the information / User Data posted on the Platform and the User, without any protest shall produce such documentary / other evidence in support of such information and if the User fails to produce such information within a reasonable or stipulated time frame, Company may, in its sole discretion, terminate the profile/access to the Platform and forfeit the advance without a refund and take appropriate steps under the provisions of law. The firm also reserves the right to investigate and take appropriate legal action without limitation at its sole discretion against any User who violates / misuses the online services and terminating the profile/access to the Platform of such violators without prior intimation who utilise the Platform in any manner which brings into disrepute or impairs the interests and functioning of Platform or the Company.
                    </Text>
                    <Text style={styles.paragraph}>
                        25.	The firm also reserves the right to investigate and take appropriate legal action without limitation at its sole discretion against any User who violates / misuses the online services and terminating the profile/access to the Platform of such violators without prior intimation who utilise the Platform in any manner which brings into disrepute or impairs the interests and functioning of Platform or the Company.
                    </Text>
                    <Text style={styles.paragraph}>
                        26.	Users who visit the Platform are classified by Appwin info tech as Users with incomplete or complete profiles. Both these types could further be free members or paid members. The firm reserves the absolute right to modify, amend, change, curtail or expand any privileges, rights, benefits, liabilities or responsibilities of all types of paid Users or free Users as it deems fit and these will be instantly applicable to all past, present and future Users. The firm allows some Users certain benefits /privileges like initiating free contact, like viewing contact details of other Users under certain conditions etc. The quantum of these benefits and even the benefits in totality will be at the sole discretion of Company. The firm will determine at its own discretion how many benefits it offers to every free User. Brahmin milan platform will simultaneously offer different levels of benefits to different free Users Benefit restriction to free Users will be done via multiple means including restricting access, spam filters, quotas etc.
                    </Text>
                    <Text style={styles.paragraph}>
                        27.	Payments for the services offered on the Platform shall be on a 100% advance basis. The payment for service once subscribed to by the User is not refundable and any amount paid shall stand appropriated. Refund if any will be at the sole discretion of the Company and it offers no guarantees whatsoever for the accuracy or timeliness of the refunds reaching the User’s card/bank accounts. Brahmin milan platform gives no guarantees of server uptime or applications working properly. All is on a best effort basis and Company’s liability for losses, damages and claims hereunder is limited to refund of amount only. Company undertakes no liability for free services. Brahmin milan platform reserves its right to amend / alter or change all or any disclaimers or these Terms at any time without any prior notice. All terms / disclaimers whether specifically mentioned or not shall be deemed to be included if any reference is made to them. The continued usage of the Platform by a User shall constitute deemed acceptance by the User of the amended Terms.
                    </Text>
                    <Text style={styles.paragraph}>
                        28.	The User is solely and exclusively responsible for maintaining confidentiality of the User password and User identification and all activities and transmission performed by the User through his/her user identification and shall be solely responsible for carrying out any online or off-line transaction involving credit cards / debit cards or such other forms of instruments or documents for making such transactions and Company assumes no responsibility or liability for their improper use of information relating to such usage of credit cards / debit cards used by the subscriber online / offline. Company uses reasonable care as is necessary to ensure that all or any data / information does not fall in the wrong hands. The weak link in credit card transaction is securely storing the data once received; therefore appwin info tech does not store or keep credit card/debit card/bank account. For the purposes of ensuring the maximum security for the financial information of a user (such as credit card/debit card/internet banking data) all such online payment transactions are carried out directly on the secured platforms of payment gateways and not on the Platform.
                    </Text>
                    <Text style={styles.paragraph}>
                        29.	No individual or group of individuals, organization, trust, or any other body formed on the basis of Brahmin community (caste), and which is a user of the Brahmin Milan Platform (Mobile App, Website & Social Media Accounts), can claim any exemption or preference on the basis of caste in respect of shares, economic or business benefits on the Brahmin Milan Platform, or any content or features offered by the Platform.
                    </Text>
                    <Text style={styles.paragraph}>
                        30.	No individual or committee of individuals, group of individuals, caste based Dharamshala, or other trust, or other social or business body, whether Brahmin or non-Brahmin, whose information and contact details are available on the Brahmin Milan Platform, can claim any share in the business income from the Brahmin Milan Platform or in the donations received on the Brahmin Milan Platform.
                    </Text>
                    <Text style={styles.paragraph}>
                        31.	Brahman Milan Platform is a completely private commercial profit electronic medium owned by Appwin info tech Proprietorship firm indore. The decision to provide access to Brahman Milan Platform and the facilities of the Platform to any individual or group of individuals shall be taken solely by the owners of aapwin info tech Proprietorship firm.
                        No other Brahmin or non-Brahmin individual or group of individuals can claim to restrict any other individual or group of individuals from accessing the Platform.

                    </Text>
                    <Text style={styles.paragraph}>
                        31.	Brahman Milan Platform is a completely private commercial profit electronic medium owned by Appwin info tech Proprietorship firm indore. The decision to provide access to Brahman Milan Platform and the facilities of the Platform to any individual or group of individuals shall be taken solely by the owners of aapwin info tech Proprietorship firm.
                        No other Brahmin or non-Brahmin individual or group of individuals can claim to restrict any other individual or group of individuals from accessing the Platform.

                    </Text>
                    <Text style={styles.paragraph}>
                        33.	The Brahmin Milan platform is and will be operated solely by the owners of Appwin info tech Proprietorship firm Indore. No person or group of persons can claim to operate the Brahmin Milan platform on any basis.
                    </Text>
                    <Text style={styles.paragraph}>
                        34.	Any User who is an activist, pandit, astrologer, storyteller(kathawachak), committees, or any other user on the Brahman Milan Platform cannot claim any monetary or other benefits or privileges or exemptions from the Brahman Milan Platform or appwin info tech Proprietorship firm.
                    </Text>
                    <Text style={styles.paragraph}>
                        35.	In all the lines mentioned above, wherever the words company or platform or firm have been used, they imply Brahman Milan Platform and appwin info tech Proprietorship firm Indore.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TermsConditions;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SW(10),
        paddingVertical: SH(16),
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: SF(15),
        fontFamily: 'Poppins-Bold',
        marginBottom: SH(16),
        color: Colors.theme_color,
    },
    paragraph: {
        fontSize: SF(13),
        lineHeight: SH(24),
        color: '#555',
        marginBottom: SH(12),
    },
});
