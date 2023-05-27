import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Dimensions, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback} from "react-native";
import { useState, useRef, useEffect } from 'react';
import { styles } from "../styles/createOrEditPlanStyles"; 

export const CreateOrEditPlan = ({navigation, route}) => {

    const screenWidth = Dimensions.get('window').width;
    const viewWidth = 0.8;
    const widthInPx = Math.round(screenWidth * viewWidth);

    const onPressAddNewPlan = () => {
        navigation.navigate('CreateTrainingPlan')
    }

    const onPressEditPlan = () => {

    }

    const onPressReturnHandler = () => {
        navigation.goBack();
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <Text style={[styles.logo, {width: widthInPx}]}>Gym Helper</Text>
                <Text style={[styles.header, {width: widthInPx}]}>Edytuj swój plan lub dodaj nowy!</Text>
            </View>

            <View style={[styles.middle, {width:widthInPx}]}>
                <TouchableOpacity
                     style={styles.card}
                     onPress={onPressAddNewPlan}>
                    <Text style={styles.cardTitle}>Stwórz nowy plan!</Text>
                    <Text style={styles.cardContent}>Wybierz ćwiczenia z baazy i utwórz z nich swój włąsny plan.</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.card}
                    onPress={onPressEditPlan}>
                    <Text style={styles.cardTitle}>Edytuj plan!</Text>
                    <Text style={styles.cardContent}>Edytuj jeden z istniejących planów treningowych. Dodaj lub usuń ćwiczenia.</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity 
                    style={[styles.button, {width: widthInPx, backgroundColor: '#5E6061'}]} 
                    onPress={onPressReturnHandler}>
                    <Text style={styles.buttonText}>
                        Powrót
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}