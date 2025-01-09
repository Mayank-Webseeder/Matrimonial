import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Splash from '../Screens/Splash';
import LoginSuccess from '../Screens/auth/LoginSuccess';
import Login from '../Screens/auth/Login';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Screens/Tabs/Home';
import Profile from '../Screens/Tabs/Profile';
import Location from '../Screens/Tabs/Location';
import IntrestedProfile from '../Screens/DrawerScreen/IntrestedProfile';
import SavedProfile from '../Screens/DrawerScreen/SavedProfile';
import CustomDrawer from '../Screens/DrawerScreen/CustomDrawer';
import BioData from '../Screens/DrawerScreen/BioData';
import { SH, SF } from '../utils/Dimensions';
import Colors from '../utils/Colors';
import Dharmshala from '../Screens/DrawerScreen/Dharmshala';
import Community from '../Screens/DrawerScreen/Community';
import Activist from '../Screens/DrawerScreen/Activist';
import PartnersPreference from '../Screens/DrawerScreen/PartnersPreference';
import FeedBack from '../Screens/DrawerScreen/FeedBack';
import Joytish from '../Screens/DrawerScreen/Joytish';
import Kathavachak from '../Screens/DrawerScreen/Kathavachak';
import Explore from '../Screens/DrawerScreen/Explore';
import Notification from '../Screens/StackScreens/Notification';
import DharamsalaDetail from '../Screens/StackScreens/DharamsalaDetail';
import CommunityFilter from '../Screens/StackScreens/CommunityFilter';
import RoleRegisterForm from '../Screens/StackScreens/RoleRegisterForm';
import PanditDetailPage from '../Screens/StackScreens/PanditDetailPage';
import KathavachakDetailsPage from '../Screens/StackScreens/KathavachakDetailsPage';
import JyotishDetailsPage from '../Screens/StackScreens/JyotishDetailsPage';
import Register from '../Screens/auth/Register';
import PhotoGallery from '../Screens/DrawerScreen/PhotoGallery';
import { Image } from 'react-native';
import CreatePost from '../Screens/StackScreens/CreatePost';
import ViewPost from '../Screens/StackScreens/ViewPost';
import SuccessStories from '../Screens/DrawerScreen/SuccessStories';
import NotificationSettings from '../Screens/DrawerScreen/NotificationSettings';
import ChangePassword from '../Screens/DrawerScreen/ChangePassword';
import PrivacySettings from '../Screens/DrawerScreen/PrivacySettings';
import InActiveDelete from '../Screens/DrawerScreen/InActiveDelete';
import PostReview from '../Screens/StackScreens/PostReview';
import ReportPage from '../Screens/StackScreens/ReportPage';
import AllReviewsPage from '../Screens/StackScreens/AllReviewsPage';
import DharamsalaSubmissionPage from '../Screens/StackScreens/DharamsalaSubmissionPage';
import CommitteeSubmissionPage from '../Screens/StackScreens/CommitteeSubmissionPage';
import Svg, { Path } from 'react-native-svg';
import EventNews from '../Screens/Tabs/EventNews';
import MyProfile from '../Screens/Tabs/MyProfile';
import Pandit from '../Screens/Tabs/Pandit';

const ActiveExploreIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path d="M6.375 14.25L11.425 12.8C11.7583 12.7 12.046 12.529 12.288 12.287C12.53 12.045 12.7007 11.7577 12.8 11.425L14.25 6.375C14.3 6.19167 14.2543 6.029 14.113 5.887C13.9717 5.745 13.809 5.69933 13.625 5.75L8.575 7.2C8.24167 7.3 7.95434 7.471 7.713 7.713C7.47167 7.955 7.30067 8.24233 7.2 8.575L5.75 13.625C5.7 13.8083 5.746 13.971 5.888 14.113C6.03 14.255 6.19233 14.3007 6.375 14.25ZM10 11.5C9.58333 11.5 9.22933 11.3543 8.938 11.063C8.64667 10.7717 8.50067 10.4173 8.5 10C8.49933 9.58267 8.64533 9.22867 8.938 8.938C9.23067 8.64733 9.58467 8.50133 10 8.5C10.4153 8.49867 10.7697 8.64467 11.063 8.938C11.3563 9.23133 11.502 9.58533 11.5 10C11.498 10.4147 11.3523 10.769 11.063 11.063C10.7737 11.357 10.4193 11.5027 10 11.5ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88334 18.6867 3.825 17.9743 2.925 17.075C2.025 16.1757 1.31267 15.1173 0.788001 13.9C0.263335 12.6827 0.000667933 11.3827 1.26582e-06 10C-0.000665401 8.61733 0.262001 7.31733 0.788001 6.1C1.314 4.88267 2.02633 3.82433 2.925 2.925C3.82367 2.02567 4.882 1.31333 6.1 0.788C7.318 0.262667 8.618 0 10 0C11.382 0 12.682 0.262667 13.9 0.788C15.118 1.31333 16.1763 2.02567 17.075 2.925C17.9737 3.82433 18.6863 4.88267 19.213 6.1C19.7397 7.31733 20.002 8.61733 20 10C19.998 11.3827 19.7353 12.6827 19.212 13.9C18.6887 15.1173 17.9763 16.1757 17.075 17.075C16.1737 17.9743 15.1153 18.687 13.9 19.213C12.6847 19.739 11.3847 20.0013 10 20Z" fill="white" />
  </Svg>
);

const InactiveExploreIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path d="M6.375 14.25L11.425 12.8C11.7583 12.7 12.046 12.529 12.288 12.287C12.53 12.045 12.7007 11.7577 12.8 11.425L14.25 6.375C14.3 6.19167 14.2543 6.029 14.113 5.887C13.9717 5.745 13.809 5.69933 13.625 5.75L8.575 7.2C8.24167 7.3 7.95434 7.471 7.713 7.713C7.47167 7.955 7.30067 8.24233 7.2 8.575L5.75 13.625C5.7 13.8083 5.746 13.971 5.888 14.113C6.03 14.255 6.19233 14.3007 6.375 14.25ZM10 11.5C9.58333 11.5 9.22933 11.3543 8.938 11.063C8.64667 10.7717 8.50067 10.4173 8.5 10C8.49933 9.58267 8.64533 9.22867 8.938 8.938C9.23067 8.64733 9.58467 8.50133 10 8.5C10.4153 8.49867 10.7697 8.64467 11.063 8.938C11.3563 9.23133 11.502 9.58533 11.5 10C11.498 10.4147 11.3523 10.769 11.063 11.063C10.7737 11.357 10.4193 11.5027 10 11.5ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88334 18.6867 3.825 17.9743 2.925 17.075C2.025 16.1757 1.31267 15.1173 0.788001 13.9C0.263335 12.6827 0.000667933 11.3827 1.26582e-06 10C-0.000665401 8.61733 0.262001 7.31733 0.788001 6.1C1.314 4.88267 2.02633 3.82433 2.925 2.925C3.82367 2.02567 4.882 1.31333 6.1 0.788C7.318 0.262667 8.618 0 10 0C11.382 0 12.682 0.262667 13.9 0.788C15.118 1.31333 16.1763 2.02567 17.075 2.925C17.9737 3.82433 18.6863 4.88267 19.213 6.1C19.7397 7.31733 20.002 8.61733 20 10C19.998 11.3827 19.7353 12.6827 19.212 13.9C18.6887 15.1173 17.9763 16.1757 17.075 17.075C16.1737 17.9743 15.1153 18.687 13.9 19.213C12.6847 19.739 11.3847 20.0013 10 20ZM10 18C12.2167 18 14.1043 17.221 15.663 15.663C17.2217 14.105 18.0007 12.2173 18 10C17.9993 7.78267 17.2203 5.895 15.663 4.337C14.1057 2.779 12.218 2 10 2C7.782 2 5.89433 2.77933 4.337 4.338C2.77967 5.89667 2.00067 7.784 2 10C1.99933 12.216 2.77867 14.1037 4.338 15.663C5.89733 17.2223 7.78467 18.0013 10 18Z" fill="white" />
  </Svg>
);

const ActivePanditIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H15C15.2652 20 15.5196 19.8946 15.7071 19.7071C15.8946 19.5196 16 19.2652 16 19C16 18.7348 15.8946 18.4804 15.7071 18.2929C15.5196 18.1054 15.2652 18 15 18H13V16H15C15.2652 16 15.5196 15.8946 15.7071 15.7071C15.8946 15.5196 16 15.2652 16 15V2C16 1.46957 15.7893 0.960859 15.4142 0.585786C15.0391 0.210714 14.5304 0 14 0H6V16H11V18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17C2 16.7348 2.10536 16.4804 2.29289 16.2929C2.48043 16.1054 2.73478 16 3 16H4V0H2Z" fill="white" />
  </Svg>
)

const InactivePanditIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M1 17V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H14C14.2652 1 14.5196 1.10536 14.7071 1.29289C14.8946 1.48043 15 1.73478 15 2V15H3C2.46957 15 1.96086 15.2107 1.58579 15.5858C1.21071 15.9609 1 16.4696 1 17ZM1 17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H15M5 1V15M12 15V19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
)

const ActiveCommitteICon = () => (
  <Svg width="25" height="25" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M11 9C12.873 9 14.57 9.62 15.815 10.487C16.998 11.312 18 12.538 18 13.857C18 14.581 17.691 15.181 17.204 15.627C16.746 16.048 16.148 16.321 15.532 16.507C14.301 16.88 12.68 17 11 17C9.32 17 7.699 16.88 6.468 16.507C5.852 16.321 5.254 16.048 4.795 15.627C4.31 15.182 4 14.582 4 13.858C4 12.539 5.002 11.313 6.185 10.488C7.43 9.62 9.127 9 11 9ZM18 10C19.044 10 19.992 10.345 20.693 10.833C21.333 11.28 22 12.023 22 12.929C22 13.446 21.775 13.875 21.44 14.182C21.134 14.463 20.756 14.628 20.411 14.732C19.941 14.874 19.386 14.947 18.81 14.979C18.932 14.634 19 14.259 19 13.857C19 12.322 18.041 11.018 16.968 10.113C17.3069 10.0381 17.6529 10.0002 18 10ZM4 10C4.358 10.0013 4.702 10.039 5.032 10.113C3.96 11.018 3 12.322 3 13.857C3 14.259 3.068 14.634 3.19 14.979C2.614 14.947 2.06 14.874 1.589 14.732C1.244 14.628 0.866 14.463 0.559 14.182C0.383027 14.0244 0.242284 13.8314 0.145961 13.6156C0.0496383 13.3999 -9.78689e-05 13.1663 1.44582e-07 12.93C1.44582e-07 12.025 0.666 11.281 1.307 10.834C2.09986 10.2905 3.03871 9.9997 4 10ZM17.5 4C18.163 4 18.7989 4.26339 19.2678 4.73223C19.7366 5.20107 20 5.83696 20 6.5C20 7.16304 19.7366 7.79893 19.2678 8.26777C18.7989 8.73661 18.163 9 17.5 9C16.837 9 16.2011 8.73661 15.7322 8.26777C15.2634 7.79893 15 7.16304 15 6.5C15 5.83696 15.2634 5.20107 15.7322 4.73223C16.2011 4.26339 16.837 4 17.5 4ZM4.5 4C5.16304 4 5.79893 4.26339 6.26777 4.73223C6.73661 5.20107 7 5.83696 7 6.5C7 7.16304 6.73661 7.79893 6.26777 8.26777C5.79893 8.73661 5.16304 9 4.5 9C3.83696 9 3.20107 8.73661 2.73223 8.26777C2.26339 7.79893 2 7.16304 2 6.5C2 5.83696 2.26339 5.20107 2.73223 4.73223C3.20107 4.26339 3.83696 4 4.5 4ZM11 0C12.0609 0 13.0783 0.421427 13.8284 1.17157C14.5786 1.92172 15 2.93913 15 4C15 5.06087 14.5786 6.07828 13.8284 6.82843C13.0783 7.57857 12.0609 8 11 8C9.93913 8 8.92172 7.57857 8.17157 6.82843C7.42143 6.07828 7 5.06087 7 4C7 2.93913 7.42143 1.92172 8.17157 1.17157C8.92172 0.421427 9.93913 0 11 0Z" fill="white" />
  </Svg>
)

const InactiveCommitteICon = () => (
  <Svg width="25" height="25" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M11 9C12.873 9 14.57 9.62 15.815 10.487C16.998 11.312 18 12.538 18 13.857C18 14.581 17.691 15.181 17.204 15.627C16.746 16.048 16.148 16.321 15.532 16.507C14.301 16.88 12.68 17 11 17C9.32 17 7.699 16.88 6.468 16.507C5.852 16.321 5.254 16.048 4.795 15.627C4.31 15.182 4 14.582 4 13.858C4 12.539 5.002 11.313 6.185 10.488C7.43 9.62 9.127 9 11 9ZM11 11C9.56 11 8.257 11.48 7.33 12.127C6.341 12.817 6 13.519 6 13.857C6 14.161 6.352 14.351 6.672 14.471L6.877 14.541L7.047 14.593C7.987 14.877 9.367 15 11 15C12.508 15 13.799 14.895 14.728 14.656L15.032 14.569L15.222 14.509C15.565 14.392 16 14.195 16 13.857C16 13.519 15.659 12.817 14.67 12.127C13.744 11.481 12.44 11 11 11ZM18 10C19.044 10 19.992 10.345 20.693 10.833C21.333 11.28 22 12.023 22 12.929C22 14.264 20.703 14.742 19.537 14.909L19.237 14.946L18.948 14.971L18.81 14.979C18.932 14.634 19 14.259 19 13.857C18.9994 13.5578 18.9635 13.2598 18.893 12.969C19.279 12.939 19.596 12.889 19.832 12.818C19.936 12.786 19.842 12.688 19.732 12.603L19.625 12.525L19.549 12.474C19.2488 12.2691 18.9104 12.127 18.554 12.056C18.174 11.296 17.59 10.638 16.968 10.113C17.3069 10.0381 17.6529 10.0002 18 10ZM4 10C4.358 10.0013 4.702 10.039 5.032 10.113C4.41 10.638 3.826 11.296 3.446 12.056C3.08958 12.127 2.75116 12.2691 2.451 12.474L2.323 12.562C2.196 12.654 2.047 12.782 2.168 12.818C2.404 12.889 2.721 12.94 3.108 12.969C3.03622 13.2595 2.99995 13.5577 3 13.857C3 14.259 3.068 14.634 3.19 14.979L2.91 14.959L2.614 14.929C1.412 14.782 0 14.322 0 12.929C0 12.024 0.666 11.28 1.307 10.833C2.09997 10.2898 3.03882 9.9994 4 10ZM17.5 4C18.163 4 18.7989 4.26339 19.2678 4.73223C19.7366 5.20107 20 5.83696 20 6.5C20 7.16304 19.7366 7.79893 19.2678 8.26777C18.7989 8.73661 18.163 9 17.5 9C16.837 9 16.2011 8.73661 15.7322 8.26777C15.2634 7.79893 15 7.16304 15 6.5C15 5.83696 15.2634 5.20107 15.7322 4.73223C16.2011 4.26339 16.837 4 17.5 4ZM4.5 4C5.16304 4 5.79893 4.26339 6.26777 4.73223C6.73661 5.20107 7 5.83696 7 6.5C7 7.16304 6.73661 7.79893 6.26777 8.26777C5.79893 8.73661 5.16304 9 4.5 9C3.83696 9 3.20107 8.73661 2.73223 8.26777C2.26339 7.79893 2 7.16304 2 6.5C2 5.83696 2.26339 5.20107 2.73223 4.73223C3.20107 4.26339 3.83696 4 4.5 4ZM11 0C12.0609 0 13.0783 0.421427 13.8284 1.17157C14.5786 1.92172 15 2.93913 15 4C15 5.06087 14.5786 6.07828 13.8284 6.82843C13.0783 7.57857 12.0609 8 11 8C9.93913 8 8.92172 7.57857 8.17157 6.82843C7.42143 6.07828 7 5.06087 7 4C7 2.93913 7.42143 1.92172 8.17157 1.17157C8.92172 0.421427 9.93913 0 11 0ZM17.5 6C17.3674 6 17.2402 6.05268 17.1464 6.14645C17.0527 6.24021 17 6.36739 17 6.5C17 6.63261 17.0527 6.75979 17.1464 6.85355C17.2402 6.94732 17.3674 7 17.5 7C17.6326 7 17.7598 6.94732 17.8536 6.85355C17.9473 6.75979 18 6.63261 18 6.5C18 6.36739 17.9473 6.24021 17.8536 6.14645C17.7598 6.05268 17.6326 6 17.5 6ZM4.5 6C4.36739 6 4.24021 6.05268 4.14645 6.14645C4.05268 6.24021 4 6.36739 4 6.5C4 6.63261 4.05268 6.75979 4.14645 6.85355C4.24021 6.94732 4.36739 7 4.5 7C4.63261 7 4.75979 6.94732 4.85355 6.85355C4.94732 6.75979 5 6.63261 5 6.5C5 6.36739 4.94732 6.24021 4.85355 6.14645C4.75979 6.05268 4.63261 6 4.5 6ZM11 2C10.4696 2 9.96086 2.21071 9.58579 2.58579C9.21071 2.96086 9 3.46957 9 4C9 4.53043 9.21071 5.03914 9.58579 5.41421C9.96086 5.78929 10.4696 6 11 6C11.5304 6 12.0391 5.78929 12.4142 5.41421C12.7893 5.03914 13 4.53043 13 4C13 3.46957 12.7893 2.96086 12.4142 2.58579C12.0391 2.21071 11.5304 2 11 2Z" fill="white" />
  </Svg>

)

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MyTabs() {
  const iconSize = SF(25);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: SF(12),
          fontWeight: 'bold',
          marginBottom: SH(5),
          color: Colors.light,
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let IconComponent = MaterialCommunityIcons;
          let tabBarIcon;

          if (route.name === 'Explore') {
            tabBarIcon = focused ? <ActiveExploreIcon /> : <InactiveExploreIcon />;
          } else if (route.name === 'Pandit') {
            tabBarIcon = focused ? <ActivePanditIcon /> : <InactivePanditIcon />;
          }
          else if (route.name === 'EventNews') {
            tabBarIcon = focused ? <ActiveCommitteICon /> : <InactiveCommitteICon />;
          }
          else if (route.name === 'MyProfile') {
            tabBarIcon = (
              <Image source={require('../Images/user.png')}
                style={{
                  width: SF(25), height: SF(25), resizeMode: "contain"
                }}
              />
            );
          } else {
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            }
            tabBarIcon = (
              <IconComponent
                name={iconName}
                size={iconSize}
                color={Colors.light}
              />
            );
          }

          return tabBarIcon;
        },
        tabBarStyle: {
          backgroundColor: Colors.theme_color, height: SH(55), borderTopLeftRadius: 15, borderTopRightRadius: 15,
        },
      })}
    >
      <Tab.Screen name="Explore" component={Explore} options={{ tabBarLabel: 'Explore' }} />
      <Tab.Screen name="Pandit" component={Pandit} options={{ tabBarLabel: 'Pandit' }} />
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="EventNews" component={EventNews} options={{ tabBarLabel: 'EventNews' }} />
      <Tab.Screen name="MyProfile" component={MyProfile} options={{ tabBarLabel: 'You' }} />
    </Tab.Navigator>
  );
}


function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: (210)
        },
      }}
    >
      <Drawer.Screen name="Tabs" component={MyTabs} />
      <Drawer.Screen name="Interested Profile" component={IntrestedProfile} />
      <Drawer.Screen name="Saved Profile" component={SavedProfile} />
      <Drawer.Screen name="Pandit" component={Pandit} />
      <Drawer.Screen name="EventNews" component={EventNews} />
      <Drawer.Screen name="Dharmshala" component={Dharmshala} />
      <Drawer.Screen name="BioData" component={BioData} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Community" component={Community} />
      <Drawer.Screen name="Activist" component={Activist} />
      <Drawer.Screen name="PartnersPreference" component={PartnersPreference} />
      <Drawer.Screen name="FeedBack" component={FeedBack} />
      <Drawer.Screen name="Joytish" component={Joytish} />
      <Drawer.Screen name="Kathavachak" component={Kathavachak} />
      <Drawer.Screen name="PhotoGallery" component={PhotoGallery} />
      <Drawer.Screen name="SuccessStories" component={SuccessStories} />
      <Drawer.Screen name="NotificationSettings" component={NotificationSettings} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      <Drawer.Screen name="PrivacySettings" component={PrivacySettings} />
      <Drawer.Screen name="InActiveDelete" component={InActiveDelete} />
    </Drawer.Navigator>
  );
}

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="LoginSuccess" component={LoginSuccess} />
      <Stack.Screen name="MainApp" component={MyDrawer} />
      <Stack.Screen name="BioData" component={BioData} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="DharamsalaDetail" component={DharamsalaDetail} />
      <Stack.Screen name="CommunityFilter" component={CommunityFilter} />
      <Stack.Screen name="RoleRegisterForm" component={RoleRegisterForm} />
      <Stack.Screen name="PanditDetailPage" component={PanditDetailPage} />
      <Stack.Screen name="KathavachakDetailsPage" component={KathavachakDetailsPage} />
      <Stack.Screen name="JyotishDetailsPage" component={JyotishDetailsPage} />
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="ViewPost" component={ViewPost} />
      <Stack.Screen name="PostReview" component={PostReview} />
      <Stack.Screen name="ReportPage" component={ReportPage} />
      <Stack.Screen name="AllReviewsPage" component={AllReviewsPage} />
      <Stack.Screen name="DharamsalaSubmissionPage" component={DharamsalaSubmissionPage} />
      <Stack.Screen name="CommitteeSubmissionPage" component={CommitteeSubmissionPage} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

