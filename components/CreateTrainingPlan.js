import { useEffect, useState, useRef } from "react";
import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback, Animated } from "react-native";
import { getExercises } from "../databaseFunctions";
import { styles } from "../styles/createTrainingPlanStyles";
import { onFocusHandler, onEndEditingHandler, onPressReturnHandler, onScreenPressHandler, onPressPlanNameHandler, onPressAddPlanHandler, renderExercises } from "../functions/createTrainingPlanFunctions";

export const CreateTrainingPlan = ({navigation, route}) => {

    const screenWidth = Dimensions.get('window').width;
    const viewWidth = 0.8;
    const widthInPx = Math.round(screenWidth * viewWidth);

    const [planName, setPlanName] = useState('');
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);

    const [exercisesAreLoading, setExercisesAreLoading] = useState(true);
    const [planAdded, setPlanAdded] = useState(false);
    const [planNameIsSet, setPlanNameIsSet] = useState(false);
    const [planNameInputTouched, setPlanNameInputTouched] = useState(false);
    const [planNameInputIsInvalid, setPlanNameInputIsInvalid] = useState(false);

    const inputPlanNameRef = useRef(null);
    const welcomeMessageOpacity = useRef(new Animated.Value(0)).current;

    const planNameIsValid = planName.trim() !== '';

    useEffect(() => {
        getExercises(setExercises);
    }, [])

    useEffect(() => {
      setPlanNameInputIsInvalid(!planNameIsValid && planNameInputTouched);
  }, [planNameIsValid, planNameInputTouched]);

    return(
      <TouchableWithoutFeedback onPress={(e) => onScreenPressHandler(e, inputPlanNameRef)}>
        <SafeAreaView style={styles.container}>
          {!planNameIsSet &&
            <SafeAreaView>

              <View style={styles.top}>
                <Text style={[styles.logo, {width: widthInPx}]}>Gym Helper</Text>
                <Text style={[styles.header, {width: widthInPx}]}>Stwórz swój idealny plan!</Text>
              </View>

              <View style={styles.middle}>
                <Text style={{fontSize:20}}>
                    Nazwa nowego planu:
                </Text>
                <TextInput 
                    value={planName} 
                    onChangeText={setPlanName} 
                    onFocus={(e) => onFocusHandler(e, setPlanNameInputTouched)} 
                    onEndEditing={(e) => onEndEditingHandler(e, setPlanNameInputTouched)} 
                    style={[styles.input, {width: widthInPx}]} 
                    placeholder='Wprowadź nazwę planu...' 
                    ref={inputPlanNameRef}/>
                { planNameInputIsInvalid && <Text style={[styles.invalid, {width:widthInPx}]}>Pole nie może być puste! </Text> }
              </View>
                
              <View>
                <TouchableOpacity 
                  style={[styles.button, {width: widthInPx, backgroundColor: '#5E6061'}]} 
                  onPress={(e) => onPressReturnHandler(e, navigation)}>
                  <Text style={styles.buttonText}>
                      Powrót
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, {width: widthInPx}]} 
                    onPress={(e) => onPressPlanNameHandler(e, setPlanNameInputTouched, planNameIsValid, setPlanNameIsSet)}>
                    <Text style={styles.buttonText}>
                        Kontynuuj
                    </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>}
          {planNameIsSet && !planAdded && 
            <View>
              <View style={styles.top}>
                  <Text style={[styles.logo, {width: widthInPx}]}>Gym Helper</Text>
                  <Text style={[styles.header, {width: widthInPx}]}>Stwórz swój idealny plan!</Text>
              </View>
              <ScrollView style={styles.mainContent}>
                  {renderExercises(exercises, widthInPx, setExercises)}
              </ScrollView>
              <View style={styles.bottom}>
                  <TouchableOpacity 
                      style={[styles.button, {width: widthInPx, backgroundColor: '#5E6061'}]} 
                      onPress={(e) => onPressReturnHandler(e, navigation)}>
                      <Text style={styles.buttonText}>
                          Powrót
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                      style={[styles.button, {width: widthInPx}]} 
                      onPress={(e) => onPressAddPlanHandler(e, exercises, setSelectedExercises, planName, welcomeMessageOpacity, setPlanAdded, setPlanName, setPlanNameInputTouched, navigation)}>
                      <Text style={styles.buttonText}>
                          Utwórz plan
                      </Text>
                  </TouchableOpacity>
              </View>
            </View>}
            {planNameIsSet && planAdded &&
            <SafeAreaView style={styles.planAddedScreen}>
              <Animated.Text 
                  style={[styles.planAddedText, {opacity: welcomeMessageOpacity}]}>
                  Pomyślnie dodano nowy plan treningowy!
              </Animated.Text>
            </SafeAreaView>}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
}