import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import ComponentsScreen from './src/screens/ComponentsScreen';
import Notes from './src/screens/Notes';
import secondScreen from './src/screens/secondScreen';
import AddNotes from './src/screens/AddNotes';
import {Modal} from 'react-native';
// import Exercise from './src/screens/Exercise';
import {NavigationContainer} from '@react-navigation/native';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Components: ComponentsScreen,
    Notes: Notes,
    Addnote: AddNotes,
  },
  {
    initialRouteName: 'Components',
    headerMode: 'none',
    mode: 'modal',
  }
);

// const Stack = createStackNavigator();
// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.navigator>
//         <Stack.Screen name="ComponentsScreen" component={ComponentsScreen} />
//         <Stack.Screen name="AddNotes" component={AddNotes} />
//       </Stack.navigator>
//     </NavigationContainer>
//   );
// };

export default createAppContainer(navigator);

/*
import {createAppContainer} from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import ComponentsScreen from './src/screens/ComponentsScreen';
import Notes from './src/screens/Notes';
import secondScreen from './src/screens/secondScreen';
import AddNotes from './src/screens/AddNotes';
import {Modal} from 'react-native';
// import Exercise from './src/screens/Exercise';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Components: ComponentsScreen,
    Notes: Notes,
    Addnote: AddNotes,
  },
  {
    initialRouteName: 'Components',
    headerMode: 'none',
    mode: 'modal',
  }
);

// const Stack = createStackNavigator();
// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.navigator>
//         <Stack.Screen name="ComponentsScreen" component={ComponentsScreen} />
//         <Stack.Screen
//           name="Notes"
//           component={Notes}
//           options={{title: 'DetailPage'}}
//         />
//       </Stack.navigator>
//     </NavigationContainer>
//   );
// };

export default createAppContainer(navigator);

// export default App;

*/
