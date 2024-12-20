import React,{useRef,useState,useEffect} from 'react';
import { View, TouchableOpacity, FlatList, Image, Alert ,Text } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/HomeStyle';
import Colors from '../../utils/Colors';
import HeadingWithViewAll from '../../Components/HeadingWithViewAll';
import { profileImages , Category ,communityData ,slider } from '../../DummyData/DummyData';
import { ScrollView } from 'react-native-gesture-handler';
import AppIntroSlider from 'react-native-app-intro-slider';
const Home = ({ navigation }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < slider.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        sliderRef.current?.goToSlide(currentIndex + 1);
      } else {
        setCurrentIndex(0);
        sliderRef.current?.goToSlide(0);
      }
    },2000); 

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Image source={item.image} style={styles.sliderImage} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
     <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <AntDesign name={'menufold'} size={20} color={Colors.theme_color} />
        </TouchableOpacity>
        <View style={styles.righticons}>
          <AntDesign name={'search1'} size={20} color={Colors.theme_color} style={{marginHorizontal:10}} />
          <AntDesign name={'bells'} size={20} color={Colors.theme_color} onPress={()=>{navigation.navigate('Notification')}} />
        </View>
      </View>
      <ScrollView>
      <View style={styles.sliderContainer}>
      <AppIntroSlider
        ref={sliderRef}
        data={slider}
        renderItem={renderItem}
        showNextButton={false}
        showDoneButton={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        onSlideChange={(index) => setCurrentIndex(index)}
      />
      </View>

     <View>
     <HeadingWithViewAll
  heading="MATRIMONY"
  showViewAll={true}
  onViewAllPress={() => navigation.navigate('Explore')}
/>
      
      <FlatList
        data={profileImages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image source={item.image} style={styles.image} />
          </View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
     </View>

     <View>
     <HeadingWithViewAll
        heading="PANDIT / JOYTISH / KATHAVACHAK"
        showViewAll={false}
      />
       <FlatList
        data={Category}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.CategoryContainer} onPress={() => {
            if (item.screen) {
              navigation.navigate(item.screen);
            } else {
              console.warn("Screen not specified for this category.");
            }
          }}
        >
            <Image source={item.image} style={styles.images} />
            <Text style={styles.text}>{item.text}</Text>
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
     </View>
      <View>
      <HeadingWithViewAll
        heading="BRAHMIN COMMUNITY"
        showViewAll={false}
      />
        <FlatList
        data={communityData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.CategoryContainer} onPress={()=>{
            if(item.screen){
             navigation.navigate(item.screen)
            }
            else{
              console.warn("Screen not specified")
            }
          }}>
            <Image source={item.image} style={styles.images} />
            <Text style={styles.text}>{item.text}</Text>
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      </View>
      <Image source={require('../../Images/slider.png')} style={styles.bottomImage}/>
      </ScrollView>
    </View>
  );
};

export default Home;
