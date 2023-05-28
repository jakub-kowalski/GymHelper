import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Dimensions, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Animated} from "react-native";
import { useState, useRef, useEffect } from 'react';
import { styles } from "../styles/addNewExerciseStyles";
import { addExercise } from "../databaseFunctions";
import { onExerciseNameFocusHandler, onExerciseBodyPartEndEditingHandler, onExerciseBodyPartFocusHandler, onExerciseNameEndEditingHandler, onScreenPressHandler, onPressReturnHandler } from "../functions/addNewExerciseFunctions";

export const AddNewExercise = ({navigation, route}) => {
    const screenWidth = Dimensions.get('window').width;
    const viewWidth = 0.8;
    const widthInPx = Math.round(screenWidth * viewWidth);

    const [exerciseName, setExerciseName] = useState('');
    const [exerciseBodyPart, setExerciseBodyPart] = useState('');
    const [exerciseDescription, setExerciseDescription] = useState('');

    const [exerciseNameInputTouched, setExerciseNameInputTouched] = useState(false);
    const [exerciseNameInputIsInvalid, setExerciseNameInputIsInvalid] = useState(false);
    const [exerciseBodyPartInputTouched, setExerciseBodyPartInputTouched] = useState(false);
    const [exerciseBodyPartInputIsInvalid, setExerciseBodyPartInputIsInvalid] = useState(false);

    const [exerciseAdded, setExerciseAdded] = useState(false);

    const exerciseNameIsValid = exerciseName.trim() !== '';
    const exerciseBodyPartIsValid = exerciseBodyPart.trim() !== '';

    const inputExerciseNameRef = useRef(null);
    const inputExerciseBodyPartRef = useRef(null);
    const inputExerciseDescriptionRef = useRef(null);
    const welcomeMessageOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setExerciseNameInputIsInvalid(!exerciseNameIsValid && exerciseNameInputTouched);
    }, [exerciseNameIsValid, exerciseNameInputTouched]);

    useEffect(() => {
        setExerciseBodyPartInputIsInvalid(!exerciseBodyPartIsValid && exerciseBodyPartInputTouched);
    }, [exerciseBodyPartIsValid, exerciseBodyPartInputTouched]);

    const onPressAddExerciseHandler = () => {
        Keyboard.dismiss();
        setExerciseNameInputTouched(true);
        setExerciseBodyPartInputTouched(true);
        if(!exerciseNameIsValid || !exerciseBodyPartIsValid){
            return;
        }
        addExercise(exerciseBodyPart, exerciseName, exerciseDescription);
        setExerciseAdded(true);
        Animated.timing(welcomeMessageOpacity, {
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

    return(
        <TouchableWithoutFeedback onPress={(e) => onScreenPressHandler(e, inputExerciseNameRef, inputExerciseBodyPartRef, inputExerciseDescriptionRef)}>
            <SafeAreaView style={styles.container}>
                {!exerciseAdded &&
                <View>
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
                            value={exerciseName}
                            onChangeText={setExerciseName}
                            onFocus={e => onExerciseNameFocusHandler(e, setExerciseNameInputTouched)}
                            onEndEditing={e => onExerciseNameEndEditingHandler(e, setExerciseNameInputTouched)}
                            placeholder="Podaj nazwę..."
                            ref={inputExerciseNameRef}/>
                            { exerciseNameInputIsInvalid && <Text style={[styles.invalid, {width:widthInPx}]}>Pole nie może być puste! </Text> }
                        <Text style={styles.inputLabel}>
                            Główna partia mięśni: 
                        </Text>
                        <TextInput 
                            style={[styles.input, {width:widthInPx}]}
                            value={exerciseBodyPart}
                            onChangeText={setExerciseBodyPart}
                            onFocus={e => onExerciseBodyPartFocusHandler(e, setExerciseBodyPartInputTouched)}
                            onEndEditing={e => onExerciseBodyPartEndEditingHandler(e, setExerciseBodyPartInputTouched)}
                            placeholder="Podaj partię mięśni..."
                            ref={inputExerciseBodyPartRef}/>
                            { exerciseBodyPartInputIsInvalid && <Text style={[styles.invalid, {width:widthInPx}]}>Pole nie może być puste! </Text> }
                        <Text style={styles.inputLabel}>
                            Opis ćwiczenia (opcjonalne): 
                        </Text>
                        <TextInput 
                            style={[styles.input, {width:widthInPx, height:200}]}
                            value={exerciseDescription}
                            onChangeText={setExerciseDescription}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Opisz ćwiczenie..."
                            ref={inputExerciseDescriptionRef}/>
                            </View>
                        <TouchableOpacity 
                            style={[styles.button, {width: widthInPx, backgroundColor: '#5E6061'}]} 
                            onPress={(e) => onPressReturnHandler(e, navigation)}>
                            <Text style={styles.buttonText}>
                                Powrót
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, {width: widthInPx}]} 
                            onPress={onPressAddExerciseHandler}>
                            <Text style={styles.buttonText}>
                                Dodaj ćwiczenie
                            </Text>
                        </TouchableOpacity>
                    </View>}
                    {exerciseAdded &&
                    <SafeAreaView style={styles.exerciseAddedScreen}>
                        <Animated.Text 
                            style={[styles.exerciseAddedText, {opacity: welcomeMessageOpacity}]}>
                            Pomyślnie dodano ćwiczenie!
                        </Animated.Text>
                    </SafeAreaView>}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}