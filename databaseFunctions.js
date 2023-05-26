import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('GymHelper');

export const createTables = () => {
    db.transaction(tx => {
      // Tabela Excercise_list
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS All_Excercises (Excercise_ID INTEGER PRIMARY KEY AUTOINCREMENT, Focused_Body_Part TEXT, Excercise_Name TEXT, Description TEXT)'
      );
      
      // Tabela Training_Plan
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Training_Plan (Plan_ID INTEGER PRIMARY KEY AUTOINCREMENT, Plan_Name TEXT, Excercises TEXT)'
      );
  
      // Tabela Training
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Training (Training_ID INTEGER PRIMARY KEY AUTOINCREMENT, Training_Date TEXT, Plan_ID INTEGER, FOREIGN KEY(Plan_ID) REFERENCES Training_Plan(Plan_ID))'
      );
    });
};

export const addExercise = (focusedBodyPart, exerciseName, description) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO All_Excercises (Focused_Body_Part, Excercise_Name, Description) VALUES (?, ?, ?)',
          [focusedBodyPart, exerciseName, description],
          (_, result) => {
            resolve(result.insertId);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  export const displayExercises = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM All_Excercises',
        [],
        (_, result) => {
          const exercises = result.rows._array;
          console.log('Exercise List:');
          exercises.forEach((exercise) => {
            console.log('ID:', exercise.Excercise_ID);
            console.log('Focused Body Part:', exercise.Focused_Body_Part);
            console.log('Exercise Name:', exercise.Excercise_Name);
            console.log('Description:', exercise.Description);
            console.log('--------------------');
           });
        },
        (_, error) => {
          console.log('Error retrieving exercises:', error);
        }
      );
    });
  };

  export const getExercises = (setExcercises, setExcercisesAreLoading) => {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM All_Excercises', null,
          (txObj, resultSet) => setExcercises(resultSet.rows._array),
          (txObj, error) => console.log(error)
        );
      });
      setExcercisesAreLoading(false);
  };