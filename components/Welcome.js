import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Dimensions, ImageBackground, KeyboardAvoidingView, Animated, TouchableWithoutFeedback} from "react-native";
import { useState, useRef, useEffect } from 'react';
import { onScreenPressHandler, onEndEditingHandler, onFocusHandler, onPressHandler} from "../functions/welcomeHandlers";
import { styles } from "../styles/welcomeStyles";

export const Welcome = ({navigation}) => {
    const screenWidth = Dimensions.get('window').width;
    const viewWidth = 0.8;
    const widthInPx = Math.round(screenWidth * viewWidth);

    const [name, setName] = useState('');
    const [nameInputTouched, setNameInputTouched] = useState(false);
    const [nameInputIsInvalid, setNameInputIsInvalid] = useState(false);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

    const inputNameRef = useRef(null);
    const welcomeMessageOpacity = useRef(new Animated.Value(0)).current;
    
    const nameIsValid = name.trim() !== '';

    useEffect(() => {
        setNameInputIsInvalid(!nameIsValid && nameInputTouched);
    }, [nameIsValid, nameInputTouched]);

  return (
    <TouchableWithoutFeedback onPress={(e) => onScreenPressHandler(e, inputNameRef)}>
        <SafeAreaView style={styles.container}>
           {!showWelcomeMessage && 
           <View>
                <View style={[styles.topView, {width: widthInPx}]}>
                    <Text style={styles.logo}>Gym</Text>
                    <Text style={styles.logo}>Helper</Text>
                    <ImageBackground 
                        source={require('../assets/logo.png')} 
                        style={styles.bg} />
                    
                </View>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -200}>
                    <View style={styles.bottomView}>
                        <Text style = {[styles.nameRequest, {width: widthInPx}]}>
                            Podaj swoje imię, aby kontynuować:
                        </Text>
                        
                        <TextInput 
                            value={name} 
                            onChangeText={setName} 
                            onFocus={(e) => onFocusHandler(e, setNameInputTouched)} 
                            onEndEditing={(e) => onEndEditingHandler(e, setNameInputTouched)} 
                            style={[styles.input, {width: widthInPx}]} 
                            placeholder='Wprowadź swoje imię...' 
                            ref={inputNameRef}
                            autoCorrect={false}/>
                        { nameInputIsInvalid && <Text style={[styles.invalid, {width:widthInPx}]}>Pole nie może być puste! </Text> }
                        
                        <TouchableOpacity 
                            style={[styles.button, {width: widthInPx}]} 
                            onPress={() => onPressHandler(setNameInputTouched, nameIsValid, setShowWelcomeMessage, welcomeMessageOpacity, navigation, name)}>
                            <Text style={styles.buttonText}>
                                Zaczynajmy!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>}
            {showWelcomeMessage && 
            <SafeAreaView
                style={styles.WelcomeMessageScreen}>
                <Animated.Text style={[styles.welcomeMessageText, {opacity: welcomeMessageOpacity}]}>
                    Witaj, {name}!
                </Animated.Text>
            </SafeAreaView>}
        </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}