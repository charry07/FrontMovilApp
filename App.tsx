// App.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { createContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from './src/api';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import Home from './src/screens/Home';
import { OrderFood } from './src/screens/Order';
import { theme } from './src/theme';
import ProfileStackScreen from './src/screens/Profile/ProfileStackScreen';
import ForgotPassword from './src/screens/Auth/ForgotPassword';
import ChangePassword from './src/screens/Auth/ChangePassword';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Usar any en AuthContextType
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextType | undefined | null>(undefined);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>({});
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const email = params.get('email');
  const token = params.get('token');

  useEffect(() => {
    api.get('/auth/validateToken').then((response) => {
      if (response.data.token) setIsAuthenticated(true);
    });

    const user = localStorage.getItem('user');
    if (user) setUser(JSON.parse(user)); // Recuperar el usuario del almacenamiento local
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {isAuthenticated ? (
            <Tab.Navigator initialRouteName='Home'>
              <Tab.Screen
                name='Home'
                component={Home}
                options={{
                  tabBarLabel: 'Home',
                  tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='home' color={color} size={size} />,
                }}
              />
              <Tab.Screen
                name='OrderFood'
                component={OrderFood}
                options={{
                  tabBarLabel: 'Ordenes',
                  tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='food' color={color} size={size} />,
                }}
              />
              <Tab.Screen
                name='Profile'
                component={ProfileStackScreen} // Usar ProfileStackScreen aquí
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='account' color={color} size={size} />,
                }}
              />
              <Tab.Screen
                name='Logout'
                component={View} // Este componente no se utilizará
                listeners={({ navigation }) => ({
                  tabPress: (event) => {
                    event.preventDefault();
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.reload();
                  },
                })}
                options={{
                  tabBarLabel: 'Cerrar Sesión',
                  tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='logout' color={color} size={size} />,
                }}
              />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator>
              {email && <Stack.Screen name='ChangePassword' component={ChangePassword} />}
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Register' component={Register} />
              <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}
