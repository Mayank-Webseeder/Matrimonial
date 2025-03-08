import React from 'react';
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SH,SW} from '../../utils/Dimensions';
const BlurProfileImage = ({ imageUrl }) => {
    const blurPhotos = useSelector((state) => state.privacy.blurPhotos); 

    return (
        <View>
            <Image
                source={imageUrl ? { uri: imageUrl } : require("../../Images/NoImage.png")}
                style={{
                    width:SW(100),
                    height:SH(100),
                    borderRadius: 50,
                    ...(blurPhotos ? { opacity: 0.3 } : {}), 
                }}
                blurRadius={blurPhotos ? 10 : 0} 
            />
        </View>
    );
};

export default BlurProfileImage;
