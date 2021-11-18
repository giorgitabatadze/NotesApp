import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Swipeout from "react-native-swipeout";
import AddNotes from "./AddNotes";
import Modal from "./Modal";
import BottomSheet from "reanimated-bottom-sheet";

let notes = [
  {
    name: "Personal",
    key: "1",
    number: 4,
    description:
      "lephants are the largest existing land animals. Three species are currently recognised: the African bush elephant, the African forest elephant,",
  },
  {
    name: "Work",
    key: "2",
    number: 6,
    description:
      "lephants are the largest existing land animals. Three species are currently recognised: the African bush elephant, the African forest elephant,",
  },
  {
    name: "Ideas",
    key: "3",
    number: 2,
    description:
      "lephants are the largest existing land animals. Three species are currently recognised: the African bush elephant, the African forest elephant,",
  },
  {
    name: "Lists",
    key: "4",
    number: 7,
    description:
      "lephants are the largest existing land animals. Three species are currently recognised: the African bush elephant, the African forest elephant,",
  },
];

const ComponentsScreen = ({ navigation }) => {
  const header1 = "My ";
  const header2 = "Notes";

  const pressHandler = (id) => {
    console.log(id);
  };

  const [notes1, setNotes] = useState(notes);
  const [visible, setVisible] = useState(false);

  const addNotes = (value, desc) => {
    const newArray = [
      ...notes1,
      { name: value, description: desc, key: (notes1.length + 1).toString() },
    ];
    setNotes(newArray);
  };

  const deleteItem = (index) => {
    const newArr = [...notes1];
    newArr.splice(index, 1);
    setNotes(newArr);
  };

  const deleteItemById = (id) => () => {
    const filteredData = data.filter((item) => item.id !== id);
    this.setState({ data: filteredData });
  };

  let swipeButton = [
    {
      text: "Delete",
      backgroundColor: "red",
      onPress: () =>
        Alert.alert("Alert", "Are you sure u want to delete note?", [
          {
            text: "No",
            onPress: () => console.log("cancel pressed"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              deleteItem();
            },
          },
        ]),
    },
  ];

  const RenderItem = ({ item }) => {
    return (
      <Swipeout right={swipeButton}>
        <Pressable
          onPress={() => navigation.navigate("Notes", item)}
          style={({ pressed }) => [{ color: pressed ? "red" : "white" }]}
        >
          {({ pressed }) => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "blue",
                justifyContent: "space-between",
                margin: 20,
              }}
            >
              <Text
                style={[{ color: pressed ? "red" : "black" }, { fontSize: 25 }]}
              >
                {item.name}
              </Text>
              <Text
                style={[
                  { color: pressed ? "red" : "black" },
                  { fontSize: 25, textAlign: "right" },
                ]}
              >
                {item.number}
              </Text>
            </View>
          )}
        </Pressable>
      </Swipeout>
    );
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}
    >
      <Text>Swipe down to close</Text>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 10, marginBottom: 30 }}>
        <BottomSheet
          ref={sheetRef}
          snapPoints={[450, 300, 0]}
          borderRadius={10}
          renderContent={renderContent}
        />

        <Text style={styles.textStyle}>
          {header1}
          <Text style={styles.subStyle}>{header2}</Text>
        </Text>
      </View>

      <FlatList
        style={styles.flatListStyle}
        keyExtractor={(notes1) => notes1.key}
        data={notes1}
        extraData={notes1}
        renderItem={({ item, index }) => <RenderItem item={item} />}
      />

      <TouchableOpacity
        style={{ backgroundColor: "green" }}
        onPress={() => navigation.navigate("modal")}
      >
        <Text> modal</Text>
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: "cyan",
          flex: 0.75,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View style={{ width: "30%" }}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate("Modal")}
          >
            <Text style={styles.menuLines}></Text>
            <Text style={styles.menuLines}></Text>
            <Text style={styles.menuLines}></Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 150 }}>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AddNotes
        visible={visible}
        addNote={addNotes}
        onClose={() => setVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 45,
    color: "red",
    alignSelf: "center",
  },
  subStyle: {
    color: "darkblue",
  },
  buttonStyle: {
    fontSize: 30,
    top: 80,
    left: 50,
    color: "black",
    marginVertical: 20,
    padding: 10,
  },
  nameStyle: {
    fontSize: 30,
  },
  numberStyle: {
    alignItems: "flex-end",
  },
  flatListStyle: {
    height: "40%",
    // flexGrow: 4,
    paddingTop: 50,
    // backgroundColor: "pink",
  },
  separateText: {
    margin: 20,
  },

  header: {
    backgroundColor: "#E91E63",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 10,
    borderBottomColor: "#ddd",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    padding: 26,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  // textInput: {
  //   alignSelf: "stretch",
  //   color: "#fff",
  //   padding: 20,
  //   backgroundColor: "#252525",
  //   borderTopWidth: 2,
  //   borderTopColor: "#ededed",
  // },
  addButton: {
    backgroundColor: "red",
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    alignSelf: "flex-end",
    top: 25,
    right: 20,
    bottom: 60,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 60,
    alignContent: "center",
  },
  menuLines: {
    width: 35,
    height: 5,
    backgroundColor: "black",
    margin: 3,
    padding: 2,
    paddingRight: 40,
    borderRadius: 50,
    // marginLeft: 30
  },
  menuButton: {
    // width: width_proportion,
    // height: 40,
    justifyContent: "center",
    paddingVertical: 40,
    marginLeft: 20,
  },
});

const width_proportion = "50%";

export default ComponentsScreen;

//  <TouchableOpacity
//           style={{
//             width: 40,
//             height: 40,
//             borderRadius: 15,
//             justifyContent: 'center',
//             alignItems: 'center',
//             paddingRight: 20
//           }}
//           onPress={() => {
//             // modal hub
//             openModal(AccountModal, { navigation });
//           }}
//         >
//           <Image source={{ uri: avatar }} style={{ width: 40, height: 40, borderRadius: 15 }} />
//         </TouchableOpacity>
