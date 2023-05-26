import { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { getExercises } from "../databaseFunctions";
import { styles } from "../styles/createTrainingPlanStyles";

export const CreateTrainingPlan = () => {

    const [excercisesAreLoading, setExcercisesAreLoading] = useState(true);
    const [excercises, setExcercises] = useState([]);
    const [currentExcercise, setCurrentExcercise] = useState(undefined);

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

    const renderExcercises = () => {
        return excercises.map((excercise) => {
            return(
            <View key={excercise.Excercise_ID}>
                <Text>{excercise.Excercise_Name}</Text>
                <Text>{excercise.Focused_Body_Part}</Text>
                <Text>{excercise.Description}</Text>
            </View>
        )});
    }

    return(
        <SafeAreaView style={styles.container}>
            {renderExcercises()}
        </SafeAreaView>
    );
}