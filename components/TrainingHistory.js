import { useEffect, useState } from "react";
import { SafeAreaView, Text, Dimensions, View, ScrollView, TouchableOpacity } from "react-native";
import { getExercises, getTrainingSessions } from "../databaseFunctions";
import { styles } from "../styles/trainingHistoryStyles";

export const TrainingHistory = ({navigation, route}) => {
    const screenWidth = Dimensions.get("window").width;
    const viewWidth = 0.8;
    const widthInPx = Math.round(screenWidth * viewWidth);
    
    const [trainingExercises, setTrainingExercises] = useState([])
    const [exercises, setExcercises] = useState([])

    useEffect(() => {
        getTrainingSessions(setTrainingExercises);
        getExercises(setExcercises)
    }, [])

    return(
    <SafeAreaView style={styles.container}>
        <View style={styles.top}>
            <Text style={[styles.logo, { width: widthInPx }]}>Gym Helper</Text>
            <Text style={[styles.header, { width: widthInPx }]}>Oto Twoje osiągnięcia!</Text>
        </View>
        <ScrollView style={[styles.mainContent, {width: widthInPx}]}>
            {trainingExercises.map((session) => {
                const exercise = exercises.find((item) => item.Excercise_ID === session.ExcerciseID);
                const exerciseName = exercise ? exercise.Excercise_Name : '';
                return (
                    <View style={[styles.card, {width:widthInPx}]}>
                        <Text style={styles.cardTitle}>Ćwiczenie: {exerciseName}{'\n'}</Text>
                        <Text>Data wykonania: {session.DateAdded}{'\n'}</Text>
                        <Text>Wykonane serie: {session.Series}{'\n'}</Text>
                        <Text>Powtórzenia w serii: {session.Reps}{'\n'}</Text>
                        <Text>Obciążenie: {session.Weight}{'\n'}</Text>
                    </View>
                );
            })}  
      </ScrollView>
      <TouchableOpacity 
        style={[styles.button, {width: widthInPx, backgroundColor: '#5E6061'}]}
        onPress={(e) => navigation.goBack()} 
        >
        <Text style={styles.buttonText}> Powrót </Text>
        </TouchableOpacity>
    </SafeAreaView>
    );
}