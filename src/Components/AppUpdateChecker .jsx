import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';

const UpdateCheck = () => {
  useEffect(() => {
    const checkUpdate = async () => {
      if (Platform.OS === 'android') {
        const inAppUpdates = new SpInAppUpdates(true); 
        try {
          const result = await inAppUpdates.checkNeedsUpdate();
          if (result.shouldUpdate) {
            inAppUpdates.startUpdate({
              updateType: IAUUpdateKind.IMMEDIATE, 
            });
          }
        } catch (error) {
          console.log('Update check failed', error);
        }
      } else {
        console.log('In-app updates not supported on iOS');
      }
    };

    checkUpdate();
  }, []);

  return null; // No UI needed, update runs in background
};

export default UpdateCheck;
