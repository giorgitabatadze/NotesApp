import ComponentsScreen from "./src/screens/ComponentsScreen";
import Notes from "./src/screens/Notes";
import { View, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import ViewNote from "./src/screens/ViewNote";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
// import slider from "./src/screens/Slider";
import AddNotes from "./src/screens/AddNotes";
import componentsScreen from "./src/screens/ComponentsScreen";
import ModalScreen from "./src/screens/Modal";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerContent() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Drawer content</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {/*<Stack.Navigator>*/}
      <Stack.Navigator>
        <Stack.Screen name={"compScreen"} component={componentsScreen} />
        <Stack.Screen
          name="AddNotes"
          component={AddNotes}
          options={{ title: "" }}
        />
        <Stack.Screen name="Notes" component={Notes} options={{ title: "" }} />
        <Stack.Screen
          name="ViewNote"
          component={ViewNote}
          options={{ title: "VIEW NOTES" }}
        />
        <Stack.Screen name="modal" component={ModalScreen} />
      </Stack.Navigator>

      {/*  <Drawer.Navigator DrawerContent={() => <DrawerContent />}>*/}
      {/*    <Drawer.Screen*/}
      {/*      name="ComponentsScreen"*/}
      {/*      component={ComponentsScreen}*/}
      {/*      options={{ title: "Homeee" }}*/}
      {/*    />*/}
      {/*  </Drawer.Navigator>*/}
      {/*</Stack.Navigator>*/}
    </NavigationContainer>
  );
}

//
// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
// // import ImagePicker from 'react-native-image-picker';
// import * as ImagePicker from "expo-image-picker";
//
//
//
// export default class App extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             resourcePath: {},
//         };
//     }
//
//     selectFile = () => {
//         var options = {
//             title: 'Select Image',
//             customButtons: [
//                 {
//                     name: 'customOptionKey',
//                     title: 'Choose file from Custom Option'
//                 },
//             ],
//             storageOptions: {
//                 skipBackup: true,
//                 path: 'images',
//             },
//         };
//
//         ImagePicker.showImagePicker(options, res => {
//             console.log('Response = ', res);
//
//             if (res.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (res.error) {
//                 console.log('ImagePicker Error: ', res.error);
//             } else if (res.customButton) {
//                 console.log('User tapped custom button: ', res.customButton);
//                 alert(res.customButton);
//             } else {
//                 let source = res;
//                 this.setState({
//                     resourcePath: source,
//                 });
//             }
//         });
//     };
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.container}>
//                     <Image
//                         source={{
//                             uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data,
//                         }}
//                         style={{ width: 100, height: 100 }}
//                     />
//                     <Image
//                         source={{ uri: this.state.resourcePath.uri }}
//                         style={{ width: 200, height: 200 }}
//                     />
//                     <Text style={{ alignItems: 'center' }}>
//                         {this.state.resourcePath.uri}
//                     </Text>
//
//                     <TouchableOpacity onPress={this.selectFile} style={styles.button}  >
//                         <Text style={styles.buttonText}>Select File</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 30,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff'
//     },
//     button: {
//         width: 250,
//         height: 60,
//         backgroundColor: '#3740ff',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 4,
//         marginBottom:12
//     },
//     buttonText: {
//         textAlign: 'center',
//         fontSize: 15,
//         color: '#fff'
//     }
// });

// import React, { Fragment, Component } from "react";
// import ImagePicker from "react-native-image-picker";
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   Image,
//   Button,
//   Dimensions,
//   TouchableOpacity,
// } from "react-native";
//
// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from "react-native/Libraries/NewAppScreen";
//
// const options = {
//   title: "Select Avatar",
//   customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
//   storageOptions: {
//     skipBackup: true,
//     path: "images",
//   },
// };
// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filepath: {
//         data: "",
//         uri: "",
//       },
//       fileData: "",
//       fileUri: "",
//     };
//   }
//
//   chooseImage = () => {
//     let options = {
//       title: "Select Image",
//       customButtons: [
//         { name: "customOptionKey", title: "Choose Photo from Custom Option" },
//       ],
//       storageOptions: {
//         skipBackup: true,
//         path: "images",
//       },
//     };
//     ImagePicker.showImagePicker(options, (response) => {
//       console.log("Response = ", response);
//
//       if (response.didCancel) {
//         console.log("User cancelled image picker");
//       } else if (response.error) {
//         console.log("ImagePicker Error: ", response.error);
//       } else if (response.customButton) {
//         console.log("User tapped custom button: ", response.customButton);
//         alert(response.customButton);
//       } else {
//         const source = { uri: response.uri };
//
//         // You can also display the image using data:
//         // const source = { uri: 'data:image/jpeg;base64,' + response.data };
//         // alert(JSON.stringify(response));s
//         console.log("response", JSON.stringify(response));
//         this.setState({
//           filePath: response,
//           fileData: response.data,
//           fileUri: response.uri,
//         });
//       }
//     });
//   };
//
//   launchCamera = () => {
//     let options = {
//       storageOptions: {
//         skipBackup: true,
//         path: "images",
//       },
//     };
//     ImagePicker.launchCamera(options, (response) => {
//       console.log("Response = ", response);
//
//       if (response.didCancel) {
//         console.log("User cancelled image picker");
//       } else if (response.error) {
//         console.log("ImagePicker Error: ", response.error);
//       } else if (response.customButton) {
//         console.log("User tapped custom button: ", response.customButton);
//         alert(response.customButton);
//       } else {
//         const source = { uri: response.uri };
//         console.log("response", JSON.stringify(response));
//         this.setState({
//           filePath: response,
//           fileData: response.data,
//           fileUri: response.uri,
//         });
//       }
//     });
//   };
//
//   launchImageLibrary = () => {
//     let options = {
//       storageOptions: {
//         skipBackup: true,
//         path: "images",
//       },
//     };
//     ImagePicker.launchImageLibrary(options, (response) => {
//       console.log("Response = ", response);
//
//       if (response.didCancel) {
//         console.log("User cancelled image picker");
//       } else if (response.error) {
//         console.log("ImagePicker Error: ", response.error);
//       } else if (response.customButton) {
//         console.log("User tapped custom button: ", response.customButton);
//         alert(response.customButton);
//       } else {
//         const source = { uri: response.uri };
//         console.log("response", JSON.stringify(response));
//         this.setState({
//           filePath: response,
//           fileData: response.data,
//           fileUri: response.uri,
//         });
//       }
//     });
//   };
//
//   renderFileData() {
//     if (this.state.fileData) {
//       return (
//         <Image
//           source={{ uri: "data:image/jpeg;base64," + this.state.fileData }}
//           style={styles.images}
//         />
//       );
//     } else {
//       return (
//         <Image source={require("./assets/splash.png")} style={styles.images} />
//       );
//     }
//   }
//
//   renderFileUri() {
//     if (this.state.fileUri) {
//       return (
//         <Image source={{ uri: this.state.fileUri }} style={styles.images} />
//       );
//     } else {
//       return (
//         <Image
//           source={require("./assets/galeryImages.jpg")}
//           style={styles.images}
//         />
//       );
//     }
//   }
//   render() {
//     return (
//       <Fragment>
//         <StatusBar barStyle="dark-content" />
//         <SafeAreaView>
//           <View style={styles.body}>
//             <Text
//               style={{ textAlign: "center", fontSize: 20, paddingBottom: 10 }}
//             >
//               Pick Images from Camera & Gallery
//             </Text>
//             <View style={styles.ImageSections}>
//               <View>
//                 {this.renderFileData()}
//                 <Text style={{ textAlign: "center" }}>Base 64 String</Text>
//               </View>
//               <View>
//                 {this.renderFileUri()}
//                 <Text style={{ textAlign: "center" }}>File Uri</Text>
//               </View>
//             </View>
//
//             <View style={styles.btnParentSection}>
//               <TouchableOpacity
//                 onPress={this.chooseImage}
//                 style={styles.btnSection}
//               >
//                 <Text style={styles.btnText}>Choose File</Text>
//               </TouchableOpacity>
//
//               <TouchableOpacity
//                 onPress={this.launchCamera}
//                 style={styles.btnSection}
//               >
//                 <Text style={styles.btnText}>Directly Launch Camera</Text>
//               </TouchableOpacity>
//
//               <TouchableOpacity
//                 onPress={this.launchImageLibrary}
//                 style={styles.btnSection}
//               >
//                 <Text style={styles.btnText}>
//                   Directly Launch Image Library
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </SafeAreaView>
//       </Fragment>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//
//   body: {
//     backgroundColor: Colors.white,
//     justifyContent: "center",
//     borderColor: "black",
//     borderWidth: 1,
//     height: Dimensions.get("screen").height - 20,
//     width: Dimensions.get("screen").width,
//   },
//   ImageSections: {
//     display: "flex",
//     flexDirection: "row",
//     paddingHorizontal: 8,
//     paddingVertical: 8,
//     justifyContent: "center",
//   },
//   images: {
//     width: 150,
//     height: 150,
//     borderColor: "black",
//     borderWidth: 1,
//     marginHorizontal: 3,
//   },
//   btnParentSection: {
//     alignItems: "center",
//     marginTop: 10,
//   },
//   btnSection: {
//     width: 225,
//     height: 50,
//     backgroundColor: "#DCDCDC",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 3,
//     marginBottom: 10,
//   },
//   btnText: {
//     textAlign: "center",
//     color: "gray",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
// });
