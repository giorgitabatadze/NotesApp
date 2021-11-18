import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Pressable,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {Text, IconButton, TextInput, FAB} from 'react-native-paper';
import {color} from 'react-native-reanimated';
import {withNavigation} from 'react-navigation';

// import { NavigationContainer } from "@react-navigation/native"
// import { createStackNavigator } from "@react-navigation/stack"

const notes = [
  {
    title: 'test',
    text: 'text',
    tag: 'tag',
  },
];
function AddNotes({visible, navigation}) {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  console.log('1111', noteTitle);

  // [1,2,3].filter(item=>item.tag==='arheuli')
  function onSaveNote() {
    // console.log(navigation);
    // navigation?.state?.params?.addNote({noteTitle});

    navigation.goBack();
  }

  //     onBack = () => {
  //         return this.props.onBack();
  //     }
  // class HandleBack extends Component {
  //     constructor(props) {
  //         super(props);
  //     }
  // }

  return (
    <>
      <Modal visible={visible}>
        <View style={styles.container}>
          <IconButton
            icon="close"
            size={25}
            color="black"
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          />
          <View style={{marginTop: 100}}>
            <TextInput
              label="Add Note Title here"
              value={noteTitle}
              mode="outlined"
              onChangeText={(text) => setNoteTitle(text)}
              style={styles.title}
            />
            {/* <TextInput
                    label="Add Note Description"
                    value={noteDescription}
                    onChangeText={setNoteDescription}
                    mode="flat"
                    multiline={true}
                    style={styles.text}
                    scrollEnabled={true}
                    returnKeyLabel='done'
                    blurOnSubmit={true}
                /> */}
          </View>
          <FAB
            style={styles.fab}
            small
            icon="check"
            disabled={noteTitle == '' ? true : false}
            onPress={() => onSaveNote()}
          ></FAB>
        </View>
        {/* <View style={styles.titleContainer}>
                <Text style= {styles.title}> the asd asd </Text>

            </View> */}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  iconButton: {
    backgroundColor: '#219653',
    position: 'absolute',
    right: 0,
    top: 40,
    margin: 10,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  text: {
    height: 300,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#219653',
  },
});

export default AddNotes;

/// addsddfdafdafa
