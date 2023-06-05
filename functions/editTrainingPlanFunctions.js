import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/editTrainingPlanStyles";


export const onPressReturnHandler = (e, navigation) => {
    navigation.goBack()
}


//nie moje
export const renderTrainingPlans = (plans, exercises, widthInPx, setSelectedPlan) => {
    return plans.map((plan) => {
      const exerciseIds = JSON.parse(plan.Excercises);
      const exerciseNames = exerciseIds.map((exerciseId) => {
        const exercise = exercises.find((item) => item.Excercise_ID === exerciseId);
        return exercise ? exercise.Excercise_Name : "";
      });
  
      return (
        <TouchableOpacity 
        key={plan.Plan_ID} 
        style= {[styles.card, {width:widthInPx}]}
        onPress={() => setSelectedPlan(plan.Plan_ID)}>
            
          <Text style={styles.exerciseName}>{plan.Plan_Name}</Text>
          {exerciseNames.map((exerciseName, index) => (
            <View style={styles.exerciseInfo}>
                <Text key={index} style={styles.focusedPart}>• {exerciseName}</Text>
            </View>))}
        </TouchableOpacity>
      );
    });
  };
  