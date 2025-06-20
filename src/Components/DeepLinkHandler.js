// DeepLinkHandler.js
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
      if (url.startsWith("brahminmilanbyappwin://")) {
        const parts = url.replace("brahminmilanbyappwin://", "").split("/");
        const [type, id] = parts;

        switch (type) {
          case "jyotish-profile":
            navigation.navigate("JyotishProfile", { id });
            break;
          case "pandit-profile":
            navigation.navigate("PanditDetailPage", { id });
            break;
          case "kathavachak-profile":
            navigation.navigate("KathavachakProfile", { id });
            break;
          default:
            console.warn("Unknown deep link type:", type);
        }
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
