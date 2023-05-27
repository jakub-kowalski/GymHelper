import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Dimensions, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Animated} from "react-native";
import { useState, useRef, useEffect } from 'react';
import { styles } from "../styles/addNewExcerciseStyles";
import { addExercise } from "../databaseFunctions";
import { onExcerciseNameFocusHandler, onExcerciseBodyPartEndEditingHandler, onExcerciseBodyPartFocusHandler, onExcerciseNameEndEditingHandler } from "../functions/addNewExcerciseFunctions";

export const AddNewExcercise = ({navigation, route}) => {
    const screenWidth = Dimensions.get('window').width;
    const viewWidth = 0.8;
    const widthInPx = Math.round(screenWidth * viewWidth);

    const [excerciseName, setExcerciseName] = useState('');
    const [excerciseBodyPart, setExcerciseBodyPart] = useState('');
    const [excerciseDescription, setExcerciseDescription] = useState('');

    const [excerciseNameInputTouched, setExcerciseNameInputTouched] = useState(false);
    const [excerciseNameInputIsInvalid, setExcerciseNameInputIsInvalid] = useState(false);
    const [excerciseBodyPartInputTouched, setExcerciseBodyPartInputTouched] = useState(false);
    const [excerciseBodyPartInputIsInvalid, setExcerciseBodyPartInputIsInvalid] = useState(false);

    const [excerciseAdded, setExcerciseAdded] = useState(false);

    const excerciseNameIsValid = excerciseName.trim() !== '';
    const excerciseBodyPartIsValid = excerciseBodyPart.trim() !== '';

    const inputExcerciseNameRef = useRef(null);
    const inputExcerciseBodyPartRef = useRef(null);
    const inputExcerciseDescriptionRef = useRef(null);
    const welcomeMessageOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setExcerciseNameInputIsInvalid(!excerciseNameIsValid && excerciseNameInputTouched);
    }, [excerciseNameIsValid, excerciseNameInputTouched]);

    useEffect(() => {
        setExcerciseBodyPartInputIsInvalid(!excerciseBodyPartIsValid && excerciseBodyPartInputTouched);
    }, [excerciseBodyPartIsValid, excerciseBodyPartInputTouched]);

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
        Keyboard.dismiss();
        setExcerciseNameInputTouched(true);
        setExcerciseBodyPartInputTouched(true);
        if(!excerciseNameIsValid || !excerciseBodyPartIsValid){
            return;
        }
        addExercise(excerciseBodyPart, excerciseName, excerciseDescription);
        setExcerciseAdded(true);
        Animated.timing(welcomeMessageOpacity, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
            setExcerciseAdded(false);
            setExcerciseName('');
            setExcerciseBodyPart('');
            setExcerciseDescription('');
            setExcerciseNameInputTouched(false);
            setExcerciseBodyPartInputTouched(false);
            navigation.goBack(0);
        }, 3000);
    }

    const onPressReturnHandler = () => {
        navigation.goBack()
    }    

    return(
        <TouchableWithoutFeedback onPress={onScreenPressHandler}>
            <SafeAreaView style={styles.container}>
                {!excerciseAdded &&
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
                            value={excerciseName}
                            onChangeText={setExcerciseName}
                            onFocus={e => onExcerciseNameFocusHandler(e, setExcerciseNameInputTouched)}
                            onEndEditing={e => onExcerciseNameEndEditingHandler(e, setExcerciseNameInputTouched)}
                            placeholder="Podaj nazwę..."
                            ref={inputExcerciseNameRef}/>
                            { excerciseNameInputIsInvalid && <Text style={[styles.invalid, {width:widthInPx}]}>Pole nie może być puste! </Text> }
                        <Text style={styles.inputLabel}>
                            Główna partia mięśni: 
                        </Text>
                        <TextInput 
                            style={[styles.input, {width:widthInPx}]}
                            value={excerciseBodyPart}
                            onChangeText={setExcerciseBodyPart}
                            onFocus={e => onExcerciseBodyPartFocusHandler(e, setExcerciseBodyPartInputTouched)}
                            onEndEditing={e => onExcerciseBodyPartEndEditingHandler(e, setExcerciseBodyPartInputTouched)}
                            placeholder="Podaj partię mięśni..."
                            ref={inputExcerciseBodyPartRef}/>
                            { excerciseBodyPartInputIsInvalid && <Text style={[styles.invalid, {width:widthInPx}]}>Pole nie może być puste! </Text> }
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
                    </View>}
                    {excerciseAdded &&
                    <SafeAreaView style={styles.excerciseAddedScreen}>
                        <Animated.Text 
                            style={[styles.excerciseAddedText, {opacity: welcomeMessageOpacity}]}>
                            Pomyślnie dodano ćwiczenie!
                        </Animated.Text>
                    </SafeAreaView>}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}