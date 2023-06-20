import { deleteExercise } from "../databaseFunctions";

export const onPressAddNewPlan = (e, navigation) => {
    navigation.navigate('CreateTrainingPlan')
}

export const onPressReturnHandler = (e, navigation) => {
    navigation.goBack();
}


export const onPressEditPlan = (e, navigation) => {
    navigation.navigate('EditTrainingPlan')
}