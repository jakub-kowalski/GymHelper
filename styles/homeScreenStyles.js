import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
    },
    top: {
        flex:1,
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
    bottom: {
        flex:5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        //borderWidth:1,
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
        height: 120
      },
      cardTitle: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: "bold",
        textAlign:'center'
      },
      cardContent: {
        fontSize: 16,
        textAlign: 'center'
      },
});