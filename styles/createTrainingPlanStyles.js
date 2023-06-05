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
    middle: {
        flex:1,
        justifyContent:'center'
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
    nameRequest: {
        fontSize:20,
        textAlign:'center'
    },
    buttonText:{
        color: 'white',
        textAlign:'center',
        fontSize:20,
        margin:5
    },
    input: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        textAlign: 'center',
        fontSize:20,
        borderRadius:30
    },
    invalid: {
        color : 'red',
        textAlign: 'right',
        marginBottom: 10
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 25,
    }, 
    bottom: {
        
    }, 
    exercise: {
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
    exerciseInfo: {
        flex:1,
        flexDirection:'column'
    },
    exerciseName: {
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
    },
    planAddedText: {
        textAlign: 'center',
        fontSize: 25,
        color: 'green'
    },
    planAddedScreen: {
        flex:1,
        justifyContent: 'center',
        height:'100%',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        margin:10,
        justifyContent:'center',
        flexDirection:'row'
      },
  });
