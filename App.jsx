import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import RootNavigator from './src/Routing/RootNavigator';
import InternetCheck from './src/Components/CheckInternet';
import FlashMessage from "react-native-flash-message";
import store from './src/ReduxStore/Store';
import UpdateCheck from './src/Components/AppUpdateChecker ';

const App = () => {

  const linking = {
    prefixes: ["https://profile.brahminmilan.in/app"],
    config: {
      screens: {
        AuthStack: {
          screens: {
            // Splash: "splash",
            // Register: "register",
            // Login: "login",
            // ForgotScreen: "forgot-screen",
          },
        },
        AppStack: {
          screens: {
            MainApp: {
              screens: {
                Tabs: {
                  screens: {
                    // Home: "home",
                    Pandit: "profile/pandit/:id",
                    Matrimonial: "profile/Matrimonial/:id",
                    // BioData: "bio-data",
                    // EventNews:"EventNews",
                    // MyProfile: "you",
                  },
                },
                // InterestedProfile: "interested-profile",
                // SavedProfile: "saved-profile",
                // Kathavachak: "profile/kathavachak/:id",
                // Dharmshala: "profile/dharamsala/:id",
                // Jyotish: "profile/jyotish/:id",
                Committee: "profile/committee/:id",
                // Activist: "activist",
                // FeedBack: "feedback",
                // SuccessStories: "success-stories",
                // NotificationSettings: "notification-settings",
                // ChangePassword: "change-password",
                // PrivacySettings: "privacy-settings",
                // InActiveDelete: "inactive-delete",
                // AboutUs: "about-us",
                // PrivacyPolicy: "privacy-policy",
                // TermsConditions: "terms-conditions",
                // SubscriptionPolicy: "subscription-policy",
                // SubscriptionHistory: "subscription-history",
                // MySuccessStory: "my-success-story",
              },
            },
            DharamsalaDetail: "profile/dharamsala-detial/:id",
            // Notification: "notification",
            // RoleRegisterForm: "role-register-form",
            PanditDetailPage: "profile/pandit-detail/:id",
            KathavachakDetailsPage: "profile/kathavachak-detail/:id",
            JyotishDetailsPage: "profile/jyotish-detail/:id",
            // CreatePost: "create-post",
            // ViewMyEventPost:"ViewMyEventPost",
            // UpdateEventPost: "update-event-post",
            ViewPost: "profile/event-news/:id",
            // PostReview: "post-review",
            // ReportPage: "report-page",
            // AllReviewsPage: "all-reviews-page",
            // DharamsalaSubmissionPage: "dharamsala-submission-page",
            // CommitteeSubmissionPage: "committee-submission-page",
            // MyUploadedCommittees: "my-uploaded-committees",
            // UpdateCommittee: "update-committee",
            // ActivistForm: "activist-form",
            // DetailedProfile: "detailed-profile",
            // PartnersPreference: "partners-preference",
            // PhotoGallery: "photo-gallery",
            // MainPartnerPrefrence: "main-partner-prefrence",
            MatrimonyPeopleProfile: "profile/Biodata/:id",
            IntrestReceivedProfilePage: "profile/interest-received-profile/:id",
            // MatrimonyPage: "matrimony-page",
            // PostSuccessStories: "post-success-story",
            // UpdateProfile: "update-profile",
            // ViewEntityImages: "view-entity-images",
            // ProfileDetail: "profile-detail",
            // UpdateProfileDetails: "update-profile-details",
            // AdvertiseWithUs: "advertise-with-us",
            ShortMatrimonialProfile: "profile/short-matrimonial-profile/:id",
            // MyuploadedDharamsala: "my-uploaded-dharamsala",
            // UpdateDharamsala: "update-dharamsala",
            // BuySubscription: "buy-subscription",
            // PanditRegister: "pandit-register",
            // JyotishRegister: "jyotish-register",
            // KathavachakRegister: "kathavachak-register",
            // LikeCommentEventPost: "like-comment-event-post",
          },
        },
      },
    },
  };



  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <RootNavigator />
        <InternetCheck />
        <UpdateCheck />
        <FlashMessage position="bottom" />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
