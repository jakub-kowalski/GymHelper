import * as SQLite from 'expo-sqlite';
import { Animated } from 'react-native';

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
      // tx.executeSql(
      //   'DROP TABLE IF EXISTS TrainingSession',
      //   [],
      //   () => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS TrainingSession (TrainingSessionID INTEGER PRIMARY KEY AUTOINCREMENT, TrainingPlanID INTEGER, ExcerciseID INTEGER, Series INTEGER, Reps INTEGER, Weight INTEGER, DateAdded TEXT, FOREIGN KEY (TrainingPlanID) REFERENCES Training_Plan(Plan_ID), FOREIGN KEY (ExcerciseID) REFERENCES All_Excercises(Excercise_ID))',
            [],
            () => {
              console.log('Tabela TrainingSession została utworzona na nowo');
            },
            (_, error) => {
              console.log('Wystąpił błąd podczas tworzenia tabeli TrainingSession:', error);
            }
          );
        },
        (_, error) => {
          console.log('Wystąpił błąd podczas usuwania tabeli TrainingSession:', error);
        }
      );
      
   // });
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

  export const getExercises = (setExcercises) => {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM All_Excercises', null,
          (txObj, resultSet) => setExcercises(resultSet.rows._array),
          (txObj, error) => console.log(error)
        );
      });
  };

  export const addTrainingPlan = (planName, selectedExercises) => {
    return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Training_Plan (Plan_Name, Excercises) VALUES (?, ?)',
        [planName, JSON.stringify(selectedExercises)],
        (_, result) => {
          resolve(result.insertId);
        },
        (_, error) => {
          reject(error);
        }

    )
    });
    })};
  
  export const getAllTrainings = (setPlans) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM Training_Plan", null,
        (txObj, resultSet) => setPlans(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  };

export const deleteAllTrainingPlans = () => {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM Training_Plan", [], 
      (txObj, resultSet) => {
        console.log("Wszystkie plany treningowe zostały usunięte.");
      },
      (txObj, error) => {
        console.log("Błąd podczas usuwania planów treningowych:", error);
      }
    );
  });
};

export const deleteTrainingPlan = (planId, setExerciseDeleted, welcomeMessageOpacity, navigation) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM Training_Plan WHERE Plan_ID = ?",
          [planId],
          (_, result) => {
            resolve(result);
            setExerciseDeleted(true)
            Animated.timing(welcomeMessageOpacity, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
          }).start();
          setTimeout(() => {
            navigation.goBack(0);
        }, 3000);
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const deleteExercise = (exerciseName) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM All_Excercises WHERE Excercise_Name = ?',
      [exerciseName],
      (txObj, resultSet) => {
        // Usunięcie rekordu zakończone sukcesem
        console.log('Usunięto rekord z tabeli Excercises');
      },
      (txObj, error) => {
        // Błąd podczas usuwania rekordu
        console.log('Błąd podczas usuwania rekordu z tabeli Excercises:', error);
      }
    );
  });
};

export const saveTrainingInformation = (planTable, selectedExercise, seriesVal, repsVal, weightVal, dateAdded) => {
  return new Promise((resolve, reject) => {
  db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO TrainingSession (TrainingPlanID, ExcerciseID, Series, Reps, Weight, DateAdded) VALUES (?, ?, ?, ?, ?, ?)',
        [planTable[0], selectedExercise, seriesVal, repsVal, weightVal, dateAdded],
        (_, result) => {
          resolve(result.insertId)
          console.log(result)
        },
        (_, error) => {
          reject(error)
          console.log('Wystąpił błąd podczas zapisywania informacji o treningu:', error);
        }
      );
  });
})};

export const getTrainingSessions = (setTrainingSessions) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM TrainingSession', null,
      (txObj, resultSet) => {
        setTrainingSessions(resultSet.rows._array)
      },
      (txObj, error) => console.log(error)
    );
  });
};



