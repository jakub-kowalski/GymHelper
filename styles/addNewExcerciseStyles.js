import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        alignItems: 'center'
    },
    top: {
        flex:1,
        marginBottom:15
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
        marginLeft:10,
        //borderWidth:1,
    },
    form: {
       flex: 6,
       //borderWidth:1,    
    },
    inputLabel: {
        marginTop:10,
        marginLeft:10,
        fontSize:20
    },
    input: {
        borderWidth: 1,
        margin: 10,
        marginBottom:10,
        padding: 15,
        fontSize:20,
        borderRadius:30,
        maxHeight:200,
    },
    invalid: {
        color : 'red',
        textAlign: 'right',
        marginBottom: 10
    },
    button: {
        backgroundColor:'black',
        borderRadius: 30,
        padding:10,
        margin:10,
        marginTop: 15
    },
    buttonText:{
        color: 'white',
        textAlign:'center',
        fontSize:20,
        margin:5
    },
    excerciseAddedText: {
        textAlign: 'center',
        fontSize: 25,
        color: 'green'
    },
    excerciseAddedScreen: {
        flex:1,
        justifyContent: 'center',
        height:'100%',
    }
  });
