import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import Routes from './src/routes/routes'; 

export default function App() {
  const [fontsLoaded] = useFonts({
    'Jaro-Regular': require('./assets/fonts/Jaro-Regular.ttf'),
    'Podkova-Regular': require('./assets/fonts/Podkova-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#A7EA9D" /> 
      </View>
    );
  }
  return <Routes/>;
}