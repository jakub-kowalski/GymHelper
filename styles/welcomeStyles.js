import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        alignItems: 'center'
    },
    bg: {
        flex: 1,
        resizeMode: 'cover',
        width:'100%'
    },
    topView: {
        flex:4,
        flexDirection:'column',
        alignItems: 'center',
        marginTop:15,
    },
    logo: {
        fontSize: 75,
        margin:0,
    },
    bottomView: {
        flex:1,
        alignItems:'center',
        justifyContent: 'flex-end',
    },
    nameRequest: {
        fontSize:20,
        textAlign:'center'
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
    button: {
        backgroundColor:'black',
        borderRadius: 30,
        padding:10,
        marginBottom:10
    },
    buttonText:{
        color: 'white',
        textAlign:'center',
        fontSize:20,
    },
    WelcomeMessageScreen: {
        flex:1,
        justifyContent: 'center',
        height:'100%',
    },
    welcomeMessageText: {
        textAlign: 'center',
        fontSize: 25,
    }
  });
