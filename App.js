import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import LoginScreen from './App/Screens/LoginScreen';
import { ClerkProvider,SignedIn ,SignedOut} from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_dG91Y2hlZC1zaGVlcGRvZy05Mi5jbGVyay5hY2NvdW50cy5kZXYk'>
    <View className="flex-1  bg-white">
      <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
        <LoginScreen/>
        </SignedOut>
    </View>
    </ClerkProvider>
  );
}

