import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import TelaSplash from "../pages/splash/splash"; 
import Login from "../pages/login/login"; 
import Menu from "../pages/menu/menu";

import Agendamentos from "../pages/opcao_agendamentos/agendamentos"; 
import Agendar from "../pages/opcao_agendar/agendar";

import { RootStackParamList } from "../@types/types"; 

const Stack = createNativeStackNavigator<RootStackParamList>(); 

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={TelaSplash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="Agendar" component={Agendar} />
                <Stack.Screen name="Agendamentos" component={Agendamentos} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}