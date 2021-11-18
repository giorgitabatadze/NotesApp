import React, { useState, useEffect } from "react";
import { StyleSheet, View, Modal, Platform, Button, Image } from "react-native";

import { IconButton, TextInput, FAB } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Alert } from "react-native-web";

// const pickFromGallery = async () => {
//   const { granted } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
//   if (granted) {
//     let data = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.5,
//     });
//     console.log(data);
//   } else {
//     Alert.alert("you should allow permission to work");
//   }
// };
//
// const pickFromCamera = async () => {
//   const { granted } = await Permissions.askAsync(Permissions.CAMERA);
//   if (granted) {
//     let data = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.5,
//     });
//     console.log(data);
//   } else {
//     Alert.alert("you should allow permission to work");
//   }
// };

const notes = [
  {
    title: "test",
    text: "text",
    tag: "tag",
  },
];
function AddNotes({ visible, navigation, addNote, onClose }) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  // console.log("1111", noteTitle);
  // console.log("desc", noteDescription);

  function onSaveNote() {
    // console.log(navigation);
    // navigation?.state?.params?.addNote({noteTitle});
    console.log("123");
    addNote(noteTitle, noteDescription);
    onClose();
  }

  //     onBack = () => {
  //         return this.props.onBack();
  //     }
  // class HandleBack extends Component {
  //     constructor(props) {
  //         super(props);
  //     }
  // }
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickImagebyCamera = async () => {
    let res = await Permissions.askAsync(Permissions.CAMERA);
    const resu = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(resu);

    if (!resu.cancelled) {
      setImage(resu.uri);
    }
  };

  return (
    <>
      <Modal visible={visible}>
        <View style={styles.container}>
          <IconButton
            icon="close"
            size={25}
            color="black"
            onPress={onClose}
            style={styles.iconButton}
          />
          <View style={{ marginTop: 100 }}>
            <TextInput
              label="Add Note Title here"
              value={noteTitle}
              mode="outlined"
              onChangeText={(text) => setNoteTitle(text)}
              style={styles.title}
            />
            <TextInput
              label="Add Note Description"
              value={noteDescription}
              onChangeText={setNoteDescription}
              mode="flat"
              multiline={true}
              style={styles.text}
              scrollEnabled={true}
              returnKeyLabel="done"
              blurOnSubmit={true}
            />
            {/*<button*/}
            {/*  style={{ width: 200, height: 100 }}*/}
            {/*  icon="camera"*/}
            {/*  theme={}*/}
            {/*  mode="contained"*/}
            {/*  onPress={() => pickFromCamera()}*/}
            {/*/>*/}
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
            />
            <Button
              title="take an image by camera "
              onPress={pickImagebyCamera}
            />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
          {/*<View*/}
          {/*  style={{ flex: 1, alignItems: "center", justifyContent: "center" }}*/}
          {/*>*/}
          {/* */}
          {/*  {image && (*/}
          {/*    <Image*/}
          {/*      source={{ uri: image }}*/}
          {/*      style={{ width: 100, height: 100 }}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*</View>*/}
          <FAB
            style={styles.fab}
            small
            icon="check"
            disabled={noteTitle == "" ? true : false}
            onPress={() => onSaveNote()}
          ></FAB>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  iconButton: {
    backgroundColor: "#219653",
    position: "absolute",
    right: 0,
    top: 40,
    margin: 10,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  text: {
    height: 100,
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: "#219653",
  },
});

export default AddNotes;

// asd

import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Pressable } from "react-native";
import Text from "./ui/Text";

export default function PressableButton({
  onPress,
  underlayColor,
  hitSlop,
  iconsAction,
  iconColor,
  iconSize,
  size,
  name,
  disabled,
}) {
  function renderChildren() {
    if (iconsAction === "floating") {
      return (
        <MaterialCommunityIcons
          name={name}
          color={iconColor || "black"}
          size={iconSize || 20}
        />
      );
    } else if (iconsAction === "chevron") {
      return (
        <Ionicons
          name={name}
          color={iconColor || "black"}
          size={iconSize || 20}
        />
      );
    } else if (iconsAction === "action") {
      return (
        <FontAwesome
          name={name}
          color={iconColor || "black"}
          size={iconSize || 20}
        />
      );
    } else {
      return <Icon color={iconColor || "black"} size={iconSize || 20} />;
    }
  }

  return (
    <Pressable
      android_ripple={{ color: "black", borderless: true }}
      style={[styles.close, { width: size, height: size }]}
      underlayColor={underlayColor}
      onPress={onPress}
      highlight
      disabled={disabled}
      hitSlop={hitSlop}
    >
      {renderChildren()}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  close: {
    borderRadius: 14,
    // backgroundColor: 'black',
    alignItems: "center",
    justifyContent: "center",
  },
});

PressableButton.propTypes = {
  // name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  iconColor: PropTypes.any,
  iconSize: PropTypes.number,
  iconsAction: PropTypes.oneOf(["floating", "chevron", "action"]),
};
