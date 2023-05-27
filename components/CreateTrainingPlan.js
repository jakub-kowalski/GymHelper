import { useEffect, useState, useRef } from "react";
import { View, Text, SafeAreaView, Dimensions, Keyboard, KeyboardAvoidingView, TouchableOpacity, ScrollView } from "react-native";
import { deleteAllTrainingPlans, getExercises } from "../databaseFunctions";
import { styles } from "../styles/createTrainingPlanStyles";
import { CheckBox } from "react-native-elements";
import { addTrainingPlan } from "../databaseFunctions";

export const CreateTrainingPlan = ({navigation, route}) => {

    const screenWidth = Dimensions.get('window').width;
    const viewWidth = 0.8;
    const widthInPx = Math.round(screenWidth * viewWidth);

    const [excercisesAreLoading, setExcercisesAreLoading] = useState(true);
    const [excercises, setExcercises] = useState([]);
    const [selectedExcercises, setSelectedExcercises] = useState([]);

    const selectedExcercisesRef = useRef([]);

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

    // const onPressAddPlanHandler = () => {
    //     console.clear()
    //     const planName = 'Plan 1'
    //     getSelectedExcercises();
    //     console.log(selectedExcercises)
    //     if (selectedExcercises.length === 0){
    //         console.log('Dodaj co najmniej jedno ćwiczenie')
    //         return
    //     }
    //     addTrainingPlan(planName, selectedExcercises)
    // }

    const onPressAddPlanHandler = () => {
        deleteAllTrainingPlans();
        console.clear();
        const planName = 'Plan 1';
      
        const selectedExcercisesTmp = getSelectedExcercises();
        setSelectedExcercises(selectedExcercisesTmp); // Aktualizacja selectedExcercises
      
        console.log(selectedExcercisesTmp);
      
        if (selectedExcercisesTmp.length === 0) {
          console.log('Dodaj co najmniej jedno ćwiczenie');
          return;
        }
      
        addTrainingPlan(planName, selectedExcercisesTmp)
          .then(() => {
            console.log('Plan treningowy dodany do bazy danych');
            // Dodatkowe operacje po dodaniu planu treningowego do bazy danych
          })
          .catch((error) => {
            console.log('Wystąpił błąd podczas dodawania planu treningowego do bazy danych:', error);
            // Obsługa błędu
          });
      };

    // const onPressAddPlanHandler = () => {
    //     console.clear();
    //     const planName = 'Plan 1';
      
    //     const selectedExcercisesTmp = getSelectedExcercises();
    //     console.log(selectedExcercisesTmp);
      
    //     if (selectedExcercisesTmp.length === 0) {
    //       console.log('Dodaj co najmniej jedno ćwiczenie');
    //       return;
    //     }
      
    //     addTrainingPlan(planName, selectedExcercisesTmp)
    //       .then(() => {
    //         console.log('Plan treningowy dodany do bazy danych');
    //         // Dodatkowe operacje po dodaniu planu treningowego do bazy danych
    //       })
    //       .catch((error) => {
    //         console.log('Wystąpił błąd podczas dodawania planu treningowego do bazy danych:', error);
    //         // Obsługa błędu
    //       });
    //   };

    const handleCheckboxChange = (excerciseId) => {
        console.log('\n\n\n\n\n\n')
        setExcercises(prevExcercises => {
          const updatedExcercises = prevExcercises.map((excercise) => {
            if (excercise.Excercise_ID === excerciseId) {
              return {
                ...excercise,
                isChecked: !excercise.isChecked,
              };
            }
            console.log(excercise)
            return excercise;
          });
          return updatedExcercises;
        });
      };

    //   const getSelectedExcercises = () => {
    //     const selectedExcercisesTmp = excercises
    //       .filter((excercise) => excercise.isChecked)
    //       .map((excercise) => excercise.Excercise_ID);
    //     setSelectedExcercises(selectedExcercisesTmp);
    //   };

    const getSelectedExcercises = () => {
        const selectedExcercisesTmp = excercises
          .filter((excercise) => excercise.isChecked)
          .map((excercise) => excercise.Excercise_ID);
        return selectedExcercisesTmp;
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
                        Utwórz plan
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}