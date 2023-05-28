import { Welcome } from './components/Welcome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './components/HomeScreen';
import { AddNewExercise } from './components/AddNewExercise';
import { useEffect } from 'react';
import { createTables } from './databaseFunctions';
import {CreateTrainingPlan} from './components/CreateTrainingPlan';
import { CreateOrEditPlan } from './components/CreateOrEditPlan';
import { BeginNewTraining } from './components/BeginNewTraining';
import { TrainingHistory } from './components/TrainingHistory';

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
            name='AddNewExercise'
            component={AddNewExercise} />
          <Stack.Screen
            name='CreateOrEditPlan'
            component={CreateOrEditPlan} />
          <Stack.Screen
            name='CreateTrainingPlan'
            component={CreateTrainingPlan} />
          <Stack.Screen
            name='BeginNewTraining'
            component={BeginNewTraining} />
          <Stack.Screen
            name='TrainingHistory'
            component={TrainingHistory} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}