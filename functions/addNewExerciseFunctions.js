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