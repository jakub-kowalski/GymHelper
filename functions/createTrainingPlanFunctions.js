import { Animated, TouchableOpacity, View, Text } from "react-native";
import { CheckBox } from "react-native-elements";
import { addTrainingPlan, deleteAllTrainingPlans } from "../databaseFunctions";
import { styles } from "../styles/createTrainingPlanStyles";

export const onFocusHandler = (e, setNameInputTouched) => {
    setNameInputTouched(false);
}

export const onEndEditingHandler = (e, setNameInputTouched) => {
    setNameInputTouched(true);
}

export const onPressReturnHandler = (e, navigation) => {
      navigation.goBack();
  }

export const onScreenPressHandler = (e, inputPlanNameRef) => {
    if(inputPlanNameRef.current){
        inputPlanNameRef.current.blur();
    }
}

export const onPressPlanNameHandler = (e, setPlanNameInputTouched, planNameIsValid, setPlanNameIsSet) => {
    setPlanNameInputTouched(true)
    if(!planNameIsValid){
      return;
    }
    setPlanNameIsSet(true)
  }

export const getSelectedExercises = (exercises) => {
    const selectedExercisesTmp = exercises
      .filter((exercise) => exercise.isChecked)
      .map((exercise) => exercise.Excercise_ID);
    return selectedExercisesTmp;
  };

export const handleCheckboxChange = (setExercises, exerciseId) => {
    setExercises(prevExercises => {
      const updatedExercises = prevExercises.map((exercise) => {
        if (exercise.Excercise_ID === exerciseId) {
          return {
            ...exercise,
            isChecked: !exercise.isChecked,
          };
        }
        return exercise;
      });
      return updatedExercises;
    });
  };

export const onPressAddPlanHandler = (e, exercises, setSelectedExercises, planName, welcomeMessageOpacity, setPlanAdded, setPlanName, setPlanNameInputTouched, navigation) => {
    //deleteAllTrainingPlans();  
    const selectedExercisesTmp = getSelectedExercises(exercises);
    setSelectedExercises(selectedExercisesTmp);
    console.log(selectedExercisesTmp);
    if (selectedExercisesTmp.length === 0) {
      console.log('Dodaj co najmniej jedno ćwiczenie');
      return;
}
  
    addTrainingPlan(planName, selectedExercisesTmp)
      .then(() => {
        console.log('Plan treningowy dodany do bazy danych');
      })
      .catch((error) => {
        console.log(error);
      });
      setPlanAdded(true);
      Animated.timing(welcomeMessageOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setPlanAdded(false);
      setPlanName('');
      setPlanNameInputTouched(false);
      navigation.goBack();
      navigation.goBack();
  }, 3000);
  };

export const renderExercises = (exercises, widthInPx, setExercises) => {
    return exercises.map((exercise) => {
        return(
        <TouchableOpacity 
            key={exercise.Excercise_ID} 
            style= {[styles.exercise, {width:widthInPx}]}
            onPress={() => handleCheckboxChange(setExercises,exercise.Excercise_ID)}>
            <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.Excercise_Name}</Text>
                <Text style={styles.focusedPart}>Główna partia: {exercise.Focused_Body_Part}</Text>
                {exercise.Description == '' ? <Text/> : <Text style ={styles.description}>Opis ćwiczenia: {exercise.Description}</Text>}
            </View>
            <CheckBox 
                containerStyle={{alignSelf: 'center', backgroundColor: 'transparent', borderWidth: 0}} 
                checked={exercise.isChecked}
                onPress={() => handleCheckboxChange(setExercises, exercise.Excercise_ID)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="#000000"/>
        </TouchableOpacity>
    )});
}