import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/editTrainingPlanStyles";
import { CheckBox } from "react-native-elements";


export const onPressReturnHandler = (e, navigation) => {
    navigation.goBack()
}

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

// export const renderExercises = (exercises, widthInPx, selectedPlan, setExercises, plans) => {
//     let trainingExercises = []
//     plans.forEach(plan => {
//         if (plan.Plan_ID === selectedPlan){
//             trainingExercises = JSON.parse(plan.Excercises)
//         }
//     });
//     return exercises.map((exercise) => {
    
//     // const isChecked = trainingExercises.includes(exercise.Excercise_ID);
    
//     return (
//     <TouchableOpacity
//         key={exercise.Excercise_ID}
//         style={[styles.card, { width: widthInPx }]}
//         onPress={() => handleCheckboxChange(setExercises, exercise.Excercise_ID)}
//     >
//         <View style={styles.exerciseInfo}>
//         <Text style={styles.exerciseName}>{exercise.Excercise_Name}</Text>
//         <Text style={styles.focusedPart}>
//             Główna partia: {exercise.Focused_Body_Part}
//         </Text>
//         {exercise.Description === '' ? (
//             <Text />
//         ) : (
//             <Text style={styles.description}>
//             Opis ćwiczenia: {exercise.Description}
//             </Text>
//         )}
//         </View>
//         <CheckBox
//         containerStyle={{
//             alignSelf: 'center',
//             backgroundColor: 'transparent',
//             borderWidth: 0,
//         }}
//         checked={exercise.isChecked}
//         onPress={() => handleCheckboxChange(setExercises, exercise.Excercise_ID)}
//         checkedIcon="dot-circle-o"
//         uncheckedIcon="circle-o"
//         checkedColor="#000000"
//         />
//     </TouchableOpacity>
//     );
// });
// };

// export const handleCheckboxChange = (setExercises, exerciseId) => {
// setExercises(prevExercises => {
//     const updatedExercises = prevExercises.map((exercise) => {
//     if (exercise.Excercise_ID === exerciseId) {
//         return {
//         ...exercise,
//         isChecked: !exercise.isChecked,
//         };
//     }
//     return exercise;
//     });
//     console.log(updatedExercises)
//     return updatedExercises;
// });
// };