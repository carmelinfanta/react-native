import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/HomeScreen/Header";
import Slider from "../Components/HomeScreen/Slider";
import { collection, getDocs, getFirestore, orderBy } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import Categories from "../Components/HomeScreen/Categories";
import LatestItemList from "../Components/HomeScreen/LatestItemList";

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliders, setSliders] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList();
  }, []);
  const getSliders = async () => {
    setSliders([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setSliders((sliders) => [...sliders, doc.data()]);
    });
  };
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapshot = await getDocs(
      collection(db, "UserPost"),
      orderBy("createdAt", "desc")
    );
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setLatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };

  return (
    <ScrollView className="py-8 px-6 bg-white flex-1">
      <Header />
      <Slider sliders={sliders} />
      <Categories categoryList={categoryList} />
      <LatestItemList latestItemList={latestItemList} />
    </ScrollView>
  );
}
