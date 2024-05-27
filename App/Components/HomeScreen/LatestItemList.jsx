import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import PostItem from "./PostItem";

export default function LatestItemList({ latestItemList }) {
  return (
    <View>
      <Text className="font-bold text-[20px]">Latest Items</Text>
      <FlatList
        data={latestItemList}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => index <= 5 && <PostItem item={item} />}
      />
    </View>
  );
}
