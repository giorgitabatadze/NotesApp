import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const ViewNotes = (navigation, route) => {
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes();
  const currentTime = time;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ textAlign: "center" }}>asdsadddasdfasdfadffdfa</Text>
        {/*<Image>{navigation.getParam("image")} </Image>*/}
        <Text>{currentTime}</Text>
        <Text>
          {route?.route?.params?.description} {""}
        </Text>
        <Image
          style={{ width: 150, height: 150 }}
          source={{
            uri:
              "https://images.unsplash.com/photo-1553174241-0b28d763cafa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          }}
        ></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  content: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
});

export default ViewNotes;
