import { useEffect } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DeepLinkHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleInitialURL = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        handleDeepLink(url);
      }
    };

    const handleDeepLink = (url) => {
      if (url.startsWith("https://play.google.com/store/apps/details")) {
        const params = new URL(url).searchParams;
        const profileType = params.get('profileType');
        const profileId = params.get('profileId');
        
        if (profileType && profileId) {
          navigateToProfile(profileType, profileId);
        }
      }
      // Handle direct app links (brahminmilan://profile)
      else if (url.startsWith("brahminmilan://profile")) {
        const path = url.replace("brahminmilan://profile/", "");
        const [type, id] = path.split("/");
        navigateToProfile(type, id);
      }
    };

    const navigateToProfile = (type, id) => {
      switch (type) {
        case "jyotish":
          navigation.navigate("JyotishDetailsPage", { id });
          break;
        case "pandit":
          navigation.navigate("PanditDetailPage", { id });
          break;
        case "kathavachak":
          navigation.navigate("KathavachakDetailsPage", { id });
          break;
        default:
          console.warn("Unknown profile type:", type);
      }
    };

    const subscription = Linking.addEventListener("url", (event) => {
      handleDeepLink(event.url);
    });

    handleInitialURL();

    return () => {
      subscription.remove();
    };
  }, []);

  return null;
};

export default DeepLinkHandler;