import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function Categories({ categoryList }) {
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity className="flex-1 items-center justify-center bg-blue-50 border-[1px] border-blue-200 m-1 h-[60px] rounded-lg">
            <Image
              source={{ uri: item?.icon }}
              className="h-[35px] w-[35px] "
            />
            <Text className="text-[12px] mt-1">{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
