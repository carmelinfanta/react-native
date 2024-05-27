import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { app } from "../../firebaseConfig";
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";

export default function AddPostScreen() {
  const db = getFirestore(app);
  const storage = getStorage();
  const { user } = useUser();
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCategoryList();
  }, []);
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const onResetMethod = () => {
    setImage(null);
  };
  const onSubmitMethod = async (value) => {
    setLoading(true);
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, "File/" + Date.now() + ".jpg");
    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          value.image = downloadUrl;
          value.userName = user.fullName;
          value.userEmail = user.primaryEmailAddress.emailAddress;
          value.userImage = user.imageUrl;

          const docRef = await addDoc(collection(db, "UserPost"), value);
          if (docRef.id) {
            setLoading(false);
            Alert.alert("Success!!!", "Post Added Successfully");
          }
        });
      });
  };
  return (
    <KeyboardAvoidingView>
      <ScrollView className="p-10 bg-white">
        <Text className="text-[27px] font-bold">Add New Post</Text>
        <Text className="text-[16px] text-gray-500 mb-7">
          Create New Post for Selling
        </Text>
        <Formik
          initialValues={{
            title: "",
            desc: "",
            category: "",
            price: "",
            image: "",
            userName: "",
            userImage: "",
            userEmail: "",
            createdAt: Date.now(),
          }}
          onSubmit={(value) => onSubmitMethod(value)}
          onReset={() => onResetMethod()}
        >
          {({
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            values,
            errors,
            resetForm,
          }) => (
            <View>
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image
                    style={{ width: 100, height: 100, borderRadius: 15 }}
                    source={{ uri: image }}
                  />
                ) : (
                  <Image
                    source={require("../../assets/placeholder.jpg")}
                    style={{ width: 100, height: 100, borderRadius: 15 }}
                  />
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={values?.title}
                onChangeText={handleChange("title")}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={values?.desc}
                numberOfLines={5}
                onChangeText={handleChange("desc")}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={values?.price}
                keyboardType="number-pad"
                onChangeText={handleChange("price")}
              />
              <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
                <Picker
                  selectedValue={values?.category}
                  onValueChange={(itemValue) =>
                    setFieldValue("category", itemValue)
                  }
                >
                  {categoryList &&
                    categoryList.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.name}
                        style={styles.input}
                        value={item.name}
                      />
                    ))}
                </Picker>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                className="p-4 bg-blue-500 rounded-full mt-8"
                style={{
                  backgroundColor: loading ? "#ccc" : "#007BFF",
                }}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white text-center text-16px">
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={resetForm}
                className="p-4 bg-gray-500 rounded-full mt-2"
              >
                <Text className="text-white text-center text-16px">Reset</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 17,
    textAlignVertical: "top",
    marginTop: 10,
    fontSize: 17,
  },
});
