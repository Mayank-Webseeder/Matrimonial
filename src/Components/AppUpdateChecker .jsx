import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';

const UpdateCheck = () => {
  useEffect(() => {
    const checkUpdate = async () => {
      if (__DEV__) {return;}

      if (Platform.OS === 'android') {
        const inAppUpdates = new SpInAppUpdates(true);
        try {
          const result = await inAppUpdates.checkNeedsUpdate();

          if (result.shouldUpdate && result.store === 'PLAY_STORE') {
            inAppUpdates.startUpdate({ updateType: IAUUpdateKind.IMMEDIATE });
          }
        } catch (error) {
          if (error?.message?.includes('-10')) {
            console.log('App not installed from Play Store. Update skipped.');
          } else {
            console.log('Update check failed', error);
          }
        }
      }
    };

    checkUpdate();
  }, []);

  return null;
};

export default UpdateCheck;
