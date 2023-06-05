import { Keyboard, Animated } from "react-native";

export const onScreenPressHandler = (e, inputNameRef) => {
    if(inputNameRef.current){
        inputNameRef.current.blur();
    }
}

export const onFocusHandler = (e, setNameInputTouched) => {
    setNameInputTouched(false);
}

export const onEndEditingHandler = (e, setNameInputTouched) => {
    setNameInputTouched(true);
}

export const onPressHandler = (setNameInputTouched, nameIsValid, setShowWelcomeMessage, welcomeMessageOpacity, navigation, name) => {
    Keyboard.dismiss();
    setNameInputTouched(true);
    if (!nameIsValid) {
        return;
    }
    setShowWelcomeMessage(true);
    Animated.timing(welcomeMessageOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
    }).start();
    setTimeout(() => {
    navigation.replace('HomeScreen', {name});
}, 3000);
};