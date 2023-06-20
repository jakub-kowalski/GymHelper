import { Animated, TouchableOpacity, View, Text } from "react-native";
import { useState } from "react";
import { CheckBox } from "react-native-elements";
import { addTrainingPlan, deleteAllTrainingPlans, displayTrainingSessions } from "../databaseFunctions";
import { styles } from "../styles/addTrainingInfoStyles";

export const onPressReturnHandler = (e, navigation) => {
    navigation.goBack();
}
