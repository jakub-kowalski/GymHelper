import { useEffect, useState, useRef } from "react";
import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback, Animated } from "react-native";
import { getAllTrainings, getExercises } from "../databaseFunctions";
import { renderTrainingPlans, onPressReturnHandler } from "../functions/editTrainingPlanFunctions";
import { styles } from "../styles/editTrainingPlanStyles";

export const BeginNewTraining = ({navigation, route}) => {
    const screenWidth = Dimensions.get('window').width;
    const viewWidth = 0.8;
    const widthInPx = Math.round(screenWidth * viewWidth);

    const [plans, setPlans] = useState([])
    const [exercises, setExercises] = useState([])

    useEffect( () => {
        getAllTrainings(setPlans)
    }, [])

    useEffect(() => {
        getExercises(setExercises)
    })

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <Text style={[styles.logo, {width: widthInPx}]}>Gym Helper</Text>
                <Text style={[styles.header, {width: widthInPx}]}>Rozpocznij trening!</Text>
            </View>
            <ScrollView style={styles.mainContent}>
                {renderTrainingPlans(plans, exercises, widthInPx)}
            </ScrollView>
            <TouchableOpacity 
                style={[styles.button, {width: widthInPx, backgroundColor: '#5E6061'}]} 
                onPress={(e) => onPressReturnHandler(e, navigation)}>
                <Text style={styles.buttonText}>
                    Powrót
                </Text>
                </TouchableOpacity>
        </SafeAreaView>
    );

}