import { useEffect, useState, useRef } from "react";
import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback, Animated } from "react-native";
import { deleteTrainingPlan, getAllTrainings, getExercises } from "../databaseFunctions";
import { renderTrainingPlans, onPressReturnHandler, renderExercises } from "../functions/editTrainingPlanFunctions";
import { styles } from "../styles/editTrainingPlanStyles";
import Modal  from "react-native-modal";

export const EditTrainingPlan = ({navigation, route}) => {
    const screenWidth = Dimensions.get('window').width;
    const viewWidth = 0.8;
    const widthInPx = Math.round(screenWidth * viewWidth);

    const welcomeMessageOpacity = useRef(new Animated.Value(0)).current;

    const [plans, setPlans] = useState([])
    const [exercises, setExercises] = useState([])
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [exerciseDeleted, setExerciseDeleted] = useState(false)
    const [exerciseEdited, setExerciseEdited] = useState(false)

    useEffect( () => {
        getAllTrainings(setPlans)
    }, [])

    useEffect(() => {
        getExercises(setExercises)
    })

    useEffect(() => {
        console.log(selectedPlan)
    }, [selectedPlan, setSelectedPlan])

    return(

            <SafeAreaView style={styles.container}>
            {!exerciseDeleted && !exerciseEdited &&
            <View>               
            <View style={styles.top}>
                    <Text style={[styles.logo, {width: widthInPx}]}>Gym Helper</Text>
                    <Text style={[styles.header, {width: widthInPx}]}>Edytuj swój plan!</Text>
                </View>
                <ScrollView>
                {renderTrainingPlans(plans, exercises, widthInPx, setSelectedPlan)}
                </ScrollView>
                <TouchableOpacity 
                    style={[styles.button, {width: widthInPx, backgroundColor: '#5E6061'}]} 
                    onPress={(e) => onPressReturnHandler(e, navigation)}>
                    <Text style={styles.buttonText}>
                        Powrót
                    </Text>
                </TouchableOpacity>
                <Modal 
                isVisible={selectedPlan !== null}
                style={styles.modalContainer}
                onBackdropPress={() => setSelectedPlan(null)}
                animationIn={"fadeInUp"}
                animationOut={"fadeOutDown"}>
                    <SafeAreaView style={[styles.modalBg, {width: widthInPx}]}>
                        <Text style={styles.modalTitle}>Co chcesz zrobić z tym planem?</Text>
                        <View style={styles.sideBtn}>
                            <TouchableOpacity style={styles.buttonModal} /*onPress={() => setExerciseEdited(true)}*/>
                                <Text style={styles.buttonTextModal}>Edytuj plan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonModal} onPress={() => deleteTrainingPlan(selectedPlan, setExerciseDeleted, welcomeMessageOpacity, navigation)}>
                                <Text style={styles.buttonTextModal}>Usuń plan</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setSelectedPlan(null)} style={[styles.button, {backgroundColor: '#5E6061'}]}>
                            <Text style={styles.buttonText}>Powrót</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>
                </View> }
                {exerciseDeleted &&
                <SafeAreaView style={styles.exerciseAddedScreen}>
                    <Animated.Text 
                        style={[styles.exerciseAddedText, {opacity: welcomeMessageOpacity}]}>
                        Pomyślnie usunięto ćwiczenie!
                    </Animated.Text>
                </SafeAreaView>}
                {exerciseEdited &&
                <SafeAreaView>
                    <ScrollView>
                        {renderExercises(exercises, widthInPx, selectedPlan, setExercises, plans)}
                    </ScrollView>
                </SafeAreaView>}
            </SafeAreaView>
    );

}