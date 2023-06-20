import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { styles } from "../styles/addTrainingInfoStyles";
import { onPressReturnHandler } from "../functions/addTrainingInformationFunctions";
import { getExercises, saveTrainingInformation } from "../databaseFunctions";
import Modal  from "react-native-modal";

export const AddTrainingInformation = ({ navigation, route }) => {
  const screenWidth = Dimensions.get("window").width;
  const viewWidth = 0.8;
  const widthInPx = Math.round(screenWidth * viewWidth);
  const { planTable } = route.params;
  const [planID, planName, planExercisesString] = planTable;
  const planExercises = JSON.parse(planExercisesString);
  const [dateAdded, setDateAdded] = useState(new Date().toISOString().split("T")[0]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [weight, setWeight] = useState(null)
  const [reps, setReps] = useState(null)
  const [series, setSeries] = useState(null)
  const [disabledButtons, setDisabledButtons] = useState([])
  const [invalid, setInvalid] = useState(false)

  useEffect(() => {
    getExercises(setExercises);
  }, []);

  const handleExerciseModalOpen = (index) => {
    setSelectedExercise(index);
    setWeight(null)
    setSeries(null)
    setReps(null)
  };

  const handleExerciseModalClose = () => {
    setSelectedExercise(null);
  };

  const handleSaveExerciseInfo = (index) => {
    setInvalid(false)
    if(reps === '' || reps === null || series === '' || series === null || weight === '' || weight === null){
      setInvalid(true)
      return
    }
    saveTrainingInformation(planTable, selectedExercise, series, reps, weight, dateAdded);
    setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, selectedExercise])
    handleExerciseModalClose();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={[styles.logo, { width: widthInPx }]}>Gym Helper</Text>
        <Text style={[styles.header, { width: widthInPx }]}>Wpisz swoje osiągnięcia!</Text>
      </View>
      <ScrollView style={[styles.mainContent, { width: widthInPx }]}>
        {planExercises.map((exerciseId, index) => {
          const exercise = exercises.find((item) => item.Excercise_ID === exerciseId);
          const exerciseName = exercise ? exercise.Excercise_Name : "";
          const isButtonDisabled = disabledButtons.includes(index)

          return (
            <TouchableOpacity 
            key={index} 
            style={styles.card} 
            onPress={() => handleExerciseModalOpen(index)}
            disabled={isButtonDisabled}>
              <Text 
              style={[styles.exerciseButtonText, 
              isButtonDisabled && styles.disabledButton]}>
                {exerciseName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Modal 
      visible={selectedExercise !== null} 
      animationType="slide" 
      style={styles.modalContainer}>
        <SafeAreaView style={[styles.modalBg, {width:widthInPx}]}>
            <Text style={styles.modalTitle}>Wpisz informacje o treningu:</Text>
            <Text>Ilość powtórzeń:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ilość powtórzeń"
              keyboardType="numeric"
              onChangeText={value => setReps(parseFloat(value))}
            />
            <Text>Ilość serii: </Text>
            <TextInput
              style={styles.input}
              placeholder="Ilość serii"
              keyboardType="numeric"
              onChangeText={value => setSeries(parseFloat(value))}
            />
            <Text>Użyty ciężar:</Text>
            <TextInput
              style={styles.input}
              placeholder="Użyty ciężar"
              keyboardType="numeric"
              onChangeText={value => setWeight(parseFloat(value))}
            />
            {invalid && 
            <Text style={{color:'red'}}>
              Pola nie mogą być puste!
            </Text>}
            <View style={styles.sideBtn}>
              <TouchableOpacity style={styles.buttonModal} onPress={handleSaveExerciseInfo}>
                <Text style={styles.buttonTextModal}>Zapisz</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonModal} onPress={handleExerciseModalClose}>
                <Text style={styles.buttonTextModal}>Zamknij</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
      </Modal>

      <View>
        <TouchableOpacity style={[styles.button, { width: widthInPx, backgroundColor: "#5E6061" }]} onPress={(e) => onPressReturnHandler(e, navigation)}>
          <Text style={styles.buttonText}>Powrót</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
