import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, StyleSheet, View, Button, Pressable, Alert } from "react-native";
import {
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { List } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import Swipeout from "react-native-swipeout";
import AddNotes from "./AddNotes";

const ComponentsScreen = ({ navigation }) => {
  const header1 = "My ";
  const header2 = "Notes";
  const text1 = "Personal ";

  const pressHandler = (id) => {
    console.log(id);
  };

  var notes = [
    {
      name: "Personal",
      key: "1",
      number: 4,
    },
    {
      name: "Work",
      key: "2",
      number: 6,
    },
    {
      name: "Ideas",
      key: "3",
      number: 2,
    },
    {
      name: "Lists",
      key: "4",
      number: 7,
    },
  ];

  const [notes1, setNotes] = useState(notes);

  const addNotes = (value) => {
    setVisible(true);
    // var newArray = [...notes, { name: value,
    //     key: (notes1.length+1).toString()
    //    }];

    notes.push({
      name: value,
      key: "5",
      number: 7,
    });
    // setNotes(newArray);
  };

  const deleteItem = (index) => {
    const newArr = [...notes];
    newArr.splice(index, 1);
    setNotes(newArr);
  };

  swipeButton = [
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
    {
      text: "Close",
      backgroundColor: "green",
      onPress: () => Alert.alert("close"),
    },
  ];

  const RenderItem = ({ item }) => {
    return (
      <Swipeout right={swipeButton}>
        <Pressable
          onPress={() => navigation.navigate("Notes", { key: item.key })}
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

  return (
    <>
      <View style={{ flex: 1 }}>
        <View
          style={{ backgroundColor: "green", marginTop: 50, marginBottom: 30 }}
        >
          <Text style={styles.textStyle}>
            {header1}
            <Text style={styles.subStyle}>{header2}</Text>
          </Text>
        </View>

        <FlatList
          style={styles.flatListStyle}
          keyExtractor={(note) => notes.key}
          data={notes}
          extraData={notes}
          renderItem={({ item, index }) => <RenderItem item={item} />}
        />

        <View
          style={{
            backgroundColor: "cyan",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "30%" }}>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuLines}></Text>
              <Text style={styles.menuLines}></Text>
              <Text style={styles.menuLines}></Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 150 }}>
            <TouchableOpacity
              onPress={() => addNotes()}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={styles.footer}>
                <TextInput style={styles.TextInput}
                placeholder='note111'>
                </TextInput>
            </View> */}
      </View>
      <AddNotes visible={visible} navigation={navigation}></AddNotes>
    </>
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
    color: "black",
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
    //  marginTop:
  },
  numberStyle: {
    alignItems: "flex-end",
  },
  flatListStyle: {
    height: "40%",
    // flexGrow: 4,
    //paddingTop: 50,
    backgroundColor: "pink",
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
  textInput: {
    alignSelf: "stretch",
    color: "#fff",
    padding: 20,
    backgroundColor: "#252525",
    borderTopWidth: 2,
    borderTopColor: "#ededed",
  },
  addButton: {
    backgroundColor: "red",
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    alignSelf: "flex-end",
    // top: 50,
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

{
  /*{(showTimeNoteTo || showTimeNoteFrom) == false ? (*/
}
{
  /*	<View />*/
}
{
  /*) : (*/
}
{
  /*	<View style={styles.timeNoteContainer}>*/
}
{
  /*		<View style={{ flex: 1 }}>*/
}
{
  /*			<Text style={styles.timeNote}>{t('transfer_time_limits')}</Text>*/
}
{
  /*		</View>*/
}
{
  /*	</View>*/
}
{
  /*)}*/
}


esari karoche sxvastan gadaricxva 
// const lang = getLanguageId();
// if (lang === 1) {
// 	return setDescription('პირადი გადარიცხვა');
// } else return setDescription('Personal Transfer');
// console.log('lang =', lang);
// setDescription(lang);
