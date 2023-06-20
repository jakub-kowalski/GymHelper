import { Keyboard, Animated } from "react-native";
import { addExercise } from "../databaseFunctions";

export const onExerciseNameFocusHandler = (e, setExerciseNameInputTouched) => {
    setExerciseNameInputTouched(false);
}

export const onExerciseNameEndEditingHandler = (e, setExerciseNameInputTouched) => {
    setExerciseNameInputTouched(true);
}

export const onExerciseBodyPartFocusHandler = (e, setExerciseBodyPartInputTouched) => {
    setExerciseBodyPartInputTouched(false);
}

export const onExerciseBodyPartEndEditingHandler = (e, setExerciseBodyPartInputTouched) => {
    setExerciseBodyPartInputTouched(true);
}

export const onScreenPressHandler = (e, inputExerciseNameRef, inputExerciseBodyPartRef, inputExerciseDescriptionRef) => {
    if(inputExerciseNameRef.current){
        inputExerciseNameRef.current.blur();
    }
    if(inputExerciseBodyPartRef.current){
        inputExerciseBodyPartRef.current.blur();
    }
    if(inputExerciseDescriptionRef.current){
        inputExerciseDescriptionRef.current.blur();
    }
}

export const onPressReturnHandler = (e, navigation) => {
    navigation.goBack()
}   

export const onPressAddExerciseHandler = (setExerciseNameInputTouched, setExerciseBodyPartInputTouched, exerciseNameIsValid, exerciseBodyPartIsValid, exerciseBodyPart, exerciseName, exerciseDescription, setExerciseAdded, welcomeMessageOpacity, setExerciseName, setExerciseBodyPart, setExerciseDescription, navigation) => {
    Keyboard.dismiss();
    setExerciseNameInputTouched(true);
    setExerciseBodyPartInputTouched(true);
    if(!exerciseNameIsValid || !exerciseBodyPartIsValid){
        return;
    }
    addExercise(exerciseBodyPart, exerciseName, exerciseDescription);
    setExerciseAdded(true);
    Animated.timing(welcomeMessageOpacity, {    // animacja wzięta z internetu
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
    }).start();
    setTimeout(() => {
        setExerciseAdded(false);
        setExerciseName('');
        setExerciseBodyPart('');
        setExerciseDescription('');
        setExerciseNameInputTouched(false);
        setExerciseBodyPartInputTouched(false);
        navigation.goBack(0);
    }, 3000);
} 