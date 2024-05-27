import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function PostItem({ item }) {
  return (
    <TouchableOpacity className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200 bg-blue-50">
      <Image
        source={{ uri: item?.image }}
        className="h-[100px] w-full rounded-lg "
      />
      <View>
        <Text className="text-[15px] font-bold mt-2">{item?.title}</Text>
        <Text className="text-[17px] font-bold text-blue-500">
          ₹ {item?.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
