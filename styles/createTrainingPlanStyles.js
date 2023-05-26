import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        //borderWidth: 1
    },
    top: {
        alignItems: 'flex-start',
        //borderWidth:1
    },
    logo: {
        textAlign:'center',
        fontSize:40,
        fontWeight: "bold",
        margin: 10,
        //borderWidth:1
    },
    header: {
        textAlign:'center',
        fontSize:25,
        marginBottom:10,
        marginLeft:10,
        //borderWidth:1,
    },
    loadingScreen: {
        flex:1,
        justifyContent: 'center',
        height:'100%',
    },
    button: {
        backgroundColor:'black',
        borderRadius: 30,
        padding:10,
        margin:10,
        marginTop: 15,
        
    },
    buttonText:{
        color: 'white',
        textAlign:'center',
        fontSize:20,
        margin:5
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 25,
    }, 
    bottom: {
        
    }, 
    excercise: {
        padding: 10,
        margin:10,
        flex: 1,
        flexDirection:'row',
        borderWidth:1,
    },
    mainContent: {
        flex:1,
        //borderWidth:1,
    },
    excerciseInfo: {
        flex:1,
        flexDirection:'column'
    },
    excerciseName: {
        fontWeight:'bold',
        fontSize:20,
        marginBottom:5
    },
    focusedPart: {
        fontSize:18,
        marginBottom: 5,
        fontStyle: 'italic'
    },
    description: {
        fontSize: 18,
    },
    checkbox: {
        justifyContent: 'center'
    }
  });
