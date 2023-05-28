export const onPressAddNewExercise = (e, navigation) => {
    navigation.navigate('AddNewExercise');
}

export const onPressCreateOrEditPlan = (e, navigation) => {
    navigation.navigate('CreateOrEditPlan');
}

export const onPressBeginTraining = (e, navigation) => {
    // getAllTrainings(setPlans, setPlansAreLoading)
    // console.log(plans)
    navigation.navigate('BeginNewTraining');
}

export const onPressTrainingHistory = (e, navigation) => {
    navigation.navigate('TrainingHistory');
}