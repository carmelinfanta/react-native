import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import React from 'react'
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
      <View>
       <Image className="w-full h-[400px] object-contain" source={require('../../assets/login.jpg')}/>
       <View className="p-8 bg-white mt-[-20px] rounded-t-3xl shadow-md ">
        <Text className="text-[28px] font-bold">Girlz Couple Dresses</Text>
        <Text className="text-[16px] text-slate-500 mt-4">Buy your favourites at affordable prices. Free Shipping & Cash on delivery Available!!!</Text>
       </View>
       <TouchableOpacity onPress={onPress} className="p-3 bg-blue-500 rounded-full mt-[40px] ml-5 mr-5">
        <Text className="text-white text-center text-[18px]">Get Started</Text>
       </TouchableOpacity>
      </View>
    
  )
}