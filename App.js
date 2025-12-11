/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Navigation from "./SRC/Navigation/Index"


function App() {
  return (
    <SafeAreaProvider>
      <Navigation/>
    </SafeAreaProvider>
  );
}



export default App;
