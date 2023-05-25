import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Dimensions, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback} from "react-native";
import { useState, useRef } from 'react';
import { styles } from "../styles/addNewExcerciseStyles";

export const AddNewExcercise = ({navigation, route}) => {
    const screenWidth = Dimensions.get('window').width;
    const viewWidth = 0.8;
    const widthInPx = Math.round(screenWidth * viewWidth);

    const [excerciseName, setExcerciseName] = useState('');
    const [excerciseBodyPart, setExcerciseBodyPart] = useState('');
    const [excerciseDescription, setExcerciseDescription] = useState('');

    const inputExcerciseNameRef = useRef(null);
    const inputExcerciseBodyPartRef = useRef(null);
    const inputExcerciseDescriptionRef = useRef(null);

    const onScreenPressHandler = () => {
        if(inputExcerciseNameRef.current){
            inputExcerciseNameRef.current.blur();
        }
        if(inputExcerciseBodyPartRef.current){
            inputExcerciseBodyPartRef.current.blur();
        }
        if(inputExcerciseDescriptionRef.current){
            inputExcerciseDescriptionRef.current.blur();
        }
    }

    const onPressAddExcerciseHandler = () => {

    }

    const onPressReturnHandler = () => {
        navigation.goBack()
    }

    return(
        <TouchableWithoutFeedback onPress={onScreenPressHandler}>
            <SafeAreaView style={styles.container}>
                <View style={[styles.top, {width:widthInPx}]}>
                    <Text style={styles.logo}>Gym Helper</Text>
                    <Text style={styles.header}>Dodaj nowe ćwiczenie</Text>
                </View>
                <View style={styles.form}>
                    <Text style={styles.inputLabel}>
                        Nazwa ćwiczenia: 
                    </Text>
                    <TextInput 
                        style={[styles.input, {width:widthInPx}]}
                        value={excerciseName}
                        onChangeText={setExcerciseName}
                        placeholder="Podaj nazwę..."
                        ref={inputExcerciseNameRef}/>
                    <Text style={styles.inputLabel}>
                        Główna partia mięśni: 
                    </Text>
                    <TextInput 
                        style={[styles.input, {width:widthInPx}]}
                        value={excerciseBodyPart}
                        onChangeText={setExcerciseBodyPart}
                        placeholder="Podaj partię mięśni..."
                        ref={inputExcerciseBodyPartRef}/>
                    <Text style={styles.inputLabel}>
                        Opis ćwiczenia (opcjonalne): 
                    </Text>
                    <TextInput 
                        style={[styles.input, {width:widthInPx, height:200}]}
                        value={excerciseDescription}
                        onChangeText={setExcerciseDescription}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Opisz ćwiczenie..."
                        ref={inputExcerciseDescriptionRef}/>
                        </View>
                    <TouchableOpacity 
                        style={[styles.button, {width: widthInPx, backgroundColor: '#5E6061'}]} 
                        onPress={onPressReturnHandler}>
                        <Text style={styles.buttonText}>
                            Powrót
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button, {width: widthInPx}]} 
                        onPress={onPressAddExcerciseHandler}>
                        <Text style={styles.buttonText}>
                            Dodaj ćwiczenie
                        </Text>
                    </TouchableOpacity>
                
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}