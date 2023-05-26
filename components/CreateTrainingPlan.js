import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Dimensions, Keyboard, KeyboardAvoidingView, TouchableOpacity, ScrollView } from "react-native";
import { getExercises } from "../databaseFunctions";
import { styles } from "../styles/createTrainingPlanStyles";
import { CheckBox } from "react-native-elements";

export const CreateTrainingPlan = ({navigation, route}) => {

    const screenWidth = Dimensions.get('window').width;
    const viewWidth = 0.8;
    const widthInPx = Math.round(screenWidth * viewWidth);

    const [excercisesAreLoading, setExcercisesAreLoading] = useState(true);
    const [excercises, setExcercises] = useState([]);
    const [selectedExcercises, setSelectedExcercises] = useState([]);

    useEffect(() => {
        getExercises(setExcercises, setExcercisesAreLoading);
    }, [])

    if(excercisesAreLoading){
        return(
            <View style={styles.loadingScreen}>
                <Text style={styles.loadingText}>Ładowanie listy ćwiczeń...</Text>
            </View>
        )
    }
    setTimeout(()=>{}, 500)
    const renderExcercises = () => {
        return excercises.map((excercise) => {
            return(
            <TouchableOpacity 
                key={excercise.Excercise_ID} 
                style= {[styles.excercise, {width:widthInPx}]}
                onPress={() => handleCheckboxChange(excercise.Excercise_ID)}>
                <View style={styles.excerciseInfo}>
                    <Text style={styles.excerciseName}>{excercise.Excercise_Name}</Text>
                    <Text style={styles.focusedPart}>Główna partia: {excercise.Focused_Body_Part}</Text>
                    {excercise.Description == '' ? <Text/> : <Text style ={styles.description}>Opis ćwiczenia: {excercise.Description}</Text>}
                </View>
                <CheckBox 
                    containerStyle={{alignSelf: 'center', backgroundColor: 'transparent', borderWidth: 0}} 
                    checked={excercise.isChecked}
                    onPress={() => handleCheckboxChange(excercise.Excercise_ID)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="#000000"/>
            </TouchableOpacity>
        )});
    }

    const onPressReturnHandler = () => {
        navigation.goBack();
    }

    const onPressAddPlanHandler = () => {
        
    }

    const handleCheckboxChange = (excerciseId) => {
        const updatedExcercises = excercises.map((excercise) => {
          if (excercise.Excercise_ID === excerciseId) {
            return {
              ...excercise,
              isChecked: !excercise.isChecked, // Zmiana stanu zaznaczenia
            };
          }
          return excercise;
        });
        setExcercises(updatedExcercises);
      };

      const getSelectedExcercises = () => {
        const selectedExcercises = excercises
          .filter((excercise) => excercise.isChecked)
          .map((excercise) => excercise.Excercise_ID);
        setSelectedExcercises(selectedExcercises);
      };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <Text style={[styles.logo, {width: widthInPx}]}>Gym Helper</Text>
                <Text style={[styles.header, {width: widthInPx}]}>Stwórz swój idealny plan!</Text>
            </View>
            <ScrollView style={styles.mainContent}>
                {renderExcercises()}
            </ScrollView>
            <View style={styles.bottom}>
                <TouchableOpacity 
                    style={[styles.button, {width: widthInPx, backgroundColor: '#5E6061'}]} 
                    onPress={onPressReturnHandler}>
                    <Text style={styles.buttonText}>
                        Powrót
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, {width: widthInPx}]} 
                    onPress={onPressAddPlanHandler}>
                    <Text style={styles.buttonText}>
                        Dodaj ćwiczenie
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}