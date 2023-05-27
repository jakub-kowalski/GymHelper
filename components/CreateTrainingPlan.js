import { useEffect, useState, useRef } from "react";
import { View, Text, SafeAreaView, Dimensions, Keyboard, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback, Animated } from "react-native";
import { deleteAllTrainingPlans, getExercises } from "../databaseFunctions";
import { styles } from "../styles/createTrainingPlanStyles";
import { CheckBox } from "react-native-elements";
import { addTrainingPlan } from "../databaseFunctions";

export const CreateTrainingPlan = ({navigation, route}) => {

    const screenWidth = Dimensions.get('window').width;
    const viewWidth = 0.8;
    const widthInPx = Math.round(screenWidth * viewWidth);

    const [excercisesAreLoading, setExcercisesAreLoading] = useState(true);
    const [excercises, setExcercises] = useState([]);
    const [selectedExcercises, setSelectedExcercises] = useState([]);
    const [planAdded, setPlanAdded] = useState(false);
    const [planNameIsSet, setPlanNameIsSet] = useState(false);
    const [planNameInputTouched, setPlanNameInputTouched] = useState(false);
    const [planNameInputIsInvalid, setPlanNameInputIsInvalid] = useState(false);

    const [planName, setPlanName] = useState('');
    const planNameIsValid = planName.trim() !== '';

    const inputPlanNameRef = useRef(null);
    const welcomeMessageOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        getExercises(setExcercises, setExcercisesAreLoading);
    }, [])

    useEffect(() => {
      setPlanNameInputIsInvalid(!planNameIsValid && planNameInputTouched);
  }, [planNameIsValid, planNameInputTouched]);

    if(excercisesAreLoading){
        return(
            <View style={styles.loadingScreen}>
                <Text style={styles.loadingText}>Ładowanie listy ćwiczeń...</Text>
            </View>
        )
    }

    const renderExcercises = () => {
        return excercises.map((excercise) => {
            return(
            <TouchableOpacity 
                key={excercise.Excercise_ID} 
                style= {[styles.excercise, {width:widthInPx}]}
                onPress={() => handleCheckboxChange(excercise.Excercise_ID)}>
                <View style={styles.excerciseInfo}>
                    <Text style={styles.excerciseName}>{excercise.Excercise_Name}</Text>
                    <Text style={styles.focusedPart}>Główna partia: {excercise.Focused_Body_Part}</Text>
                    {excercise.Description == '' ? <Text/> : <Text style ={styles.description}>Opis ćwiczenia: {excercise.Description}</Text>}
                </View>
                <CheckBox 
                    containerStyle={{alignSelf: 'center', backgroundColor: 'transparent', borderWidth: 0}} 
                    checked={excercise.isChecked}
                    onPress={() => handleCheckboxChange(excercise.Excercise_ID)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="#000000"/>
            </TouchableOpacity>
        )});
    }

  const onFocusHandler = (e, setNameInputTouched) => {
      setNameInputTouched(false);
  }
  
  const onEndEditingHandler = (e, setNameInputTouched) => {
      setNameInputTouched(true);
  }

  const onPressReturnHandler = () => {
        navigation.goBack();
    }

    const onPressAddPlanHandler = () => {
        //deleteAllTrainingPlans();   
        const selectedExcercisesTmp = getSelectedExcercises();
        setSelectedExcercises(selectedExcercisesTmp);
        console.log(selectedExcercisesTmp);
        if (selectedExcercisesTmp.length === 0) {
          console.log('Dodaj co najmniej jedno ćwiczenie');
          return;
        }
      
        addTrainingPlan(planName, selectedExcercisesTmp)
          .then(() => {
            console.log('Plan treningowy dodany do bazy danych');
          })
          .catch((error) => {
            console.log(error);
          });
          setPlanAdded(true);
          Animated.timing(welcomeMessageOpacity, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
          setPlanAdded(false);
          setPlanName('');
          setPlanNameInputTouched(false);
          navigation.goBack();
          navigation.goBack();
      }, 3000);
      };

    const handleCheckboxChange = (excerciseId) => {
        setExcercises(prevExcercises => {
          const updatedExcercises = prevExcercises.map((excercise) => {
            if (excercise.Excercise_ID === excerciseId) {
              return {
                ...excercise,
                isChecked: !excercise.isChecked,
              };
            }
            return excercise;
          });
          return updatedExcercises;
        });
      };

    const getSelectedExcercises = () => {
        const selectedExcercisesTmp = excercises
          .filter((excercise) => excercise.isChecked)
          .map((excercise) => excercise.Excercise_ID);
        return selectedExcercisesTmp;
      };

    const onPressNameHandler = () => {
        setPlanNameInputTouched(true)
        if(!planNameIsValid){
          return;
        }
        setPlanNameIsSet(true)
      }

      const onScreenPressHandler = () => {
        if(inputPlanNameRef.current){
            inputPlanNameRef.current.blur();
        }
    }

    return(
      <TouchableWithoutFeedback onPress={onScreenPressHandler}>
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
                    onPress={onPressReturnHandler}>
                    <Text style={styles.buttonText}>
                        Powrót
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                      style={[styles.button, {width: widthInPx}]} 
                      onPress={onPressNameHandler}>
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
                  {renderExcercises()}
              </ScrollView>
              <View style={styles.bottom}>
                  <TouchableOpacity 
                      style={[styles.button, {width: widthInPx, backgroundColor: '#5E6061'}]} 
                      onPress={onPressReturnHandler}>
                      <Text style={styles.buttonText}>
                          Powrót
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                      style={[styles.button, {width: widthInPx}]} 
                      onPress={onPressAddPlanHandler}>
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