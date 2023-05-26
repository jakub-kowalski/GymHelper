import { Welcome } from './components/Welcome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './components/HomeScreen';
import { AddNewExcercise } from './components/AddNewExcercise';
import { useEffect } from 'react';
import { createTables } from './databaseFunctions';
import {CreateTrainingPlan} from './components/CreateTrainingPlan';

export default function App() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    createTables();
  }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown:false}}>
          <Stack.Screen 
            name='Welcome' 
            component={Welcome} />
          <Stack.Screen 
            name='HomeScreen' 
            component={HomeScreen} />
          <Stack.Screen
            name='AddNewExcercise'
            component={AddNewExcercise} />
          <Stack.Screen
            name='CreateTrainingPlan'
            component={CreateTrainingPlan} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}