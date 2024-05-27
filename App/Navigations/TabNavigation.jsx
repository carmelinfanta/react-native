import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import ExploreScreen from '../Screens/ExploreScreen';
import HomeScreen from '../Screens/HomeScreen';
import AddPostScreen from '../Screens/AddPostScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false
    }}>
    <Tab.Screen name="home" component={HomeScreen} 
    options={{
        tabBarLabel:({color})=>(
<Text style={{color:color, fontSize:12, marginBottom:3}}>Home</Text>
        ),
        tabBarIcon:({color,size})=>(
<Ionicons name="home" size={size} color={color} />
        )
    }} />
    <Tab.Screen name="explore" component={ExploreScreen} options={{
        tabBarLabel:({color})=>(
<Text style={{color:color, fontSize:12, marginBottom:3}}>Explore</Text>
        ),
        tabBarIcon:({color,size})=>(
<Ionicons name="search" size={size} color={color} />
        )
    }}/>
    <Tab.Screen name="addpost" component={AddPostScreen} options={{
        tabBarLabel:({color})=>(
<Text style={{color:color, fontSize:12, marginBottom:3}}>AddPost</Text>
        ),
        tabBarIcon:({color,size})=>(
<Ionicons name="camera" size={size} color={color} />
        )
    }} />
    <Tab.Screen name="profile" component={ProfileScreen} options={{
        tabBarLabel:({color})=>(
<Text style={{color:color, fontSize:12, marginBottom:3}}>Profile</Text>
        ),
        tabBarIcon:({color,size})=>(
<Ionicons name="person-circle" size={size} color={color} />
        )
    }} />
  </Tab.Navigator>
  )
}