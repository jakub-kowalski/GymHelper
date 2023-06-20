import { View, Text, SafeAreaView, TouchableOpacity, Dimensions} from "react-native";
import { useState, useRef, useEffect } from 'react';
import { styles  } from "../styles/homeScreenStyles";
import { displayTrainingSessions, getAllTrainings } from "../databaseFunctions";
import { onPressCreateOrEditPlan, onPressTrainingHistory, onPressAddNewExercise, onPressBeginTraining } from "../functions/homeScreenFunctions";

export const HomeScreen = ({navigation, route}) => {
    const {name} = route.params;
    
    const screenWidth = Dimensions.get('window').width;
    const viewWidth = 0.8;
    const widthInPx = Math.round(screenWidth * viewWidth);

    const [plans, setPlans] = useState([]);
    const [plansAreLoading, setPlansAreLoading] = useState(true)

    useEffect(() => {
        console.log(plans)
    }, [plans])
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <Text style={[styles.logo, {width: widthInPx}]}>Gym Helper</Text>
                <Text style={[styles.header, {width: widthInPx}]}>Co dzisiaj robimy, {name}?</Text>
            </View>
            <View style={[styles.bottom, {width:widthInPx}]}>
                <TouchableOpacity
                     style={styles.card}
                     onPress={(e) => onPressBeginTraining(e, navigation)}>
                    <Text style={styles.cardTitle}>Rozpocznij trening!</Text>
                    <Text style={styles.cardContent}>Wybierz jeden ze swoich planów treningowych i ruszaj bić kolejne rekordy!</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.card}
                    onPress={(e) => onPressCreateOrEditPlan(e, navigation)}>
                    <Text style={styles.cardTitle}>Stwórz lub edytuj swój plan!</Text>
                    <Text style={styles.cardContent}>Dobry plan to podstawa. Już teraz możesz stworzyć swój własny plan treningowy z dostępnych w bazie ćwiczeń lub edytować już istniejący!</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.card}
                    onPress={(e) => onPressTrainingHistory(e, navigation)}>
                    <Text style={styles.cardTitle}>Sprawdź swoje postępy!</Text>
                    <Text style={styles.cardContent}>Tu możesz sprawdzić historię swoich treningów i porównać swoje osiągnięcia!</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.card}
                onPress={(e) => onPressAddNewExercise(e, navigation)}>
                    <Text style={styles.cardTitle}>Dodaj nowe ćwiczenia!</Text>
                    <Text style={styles.cardContent}>Nie znalazłeś swojego ulubionego ćwiczenia? Nic straconego! Przyczyń się do rozwoju naszej bazy!</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}