import React ,{Component} from 'react';
import { StyleSheet,View,Text,TouchableHighlight} from 'react-native';
import JPush from 'jpush-react-native';



class Button extends React.Component {
    render() {
        return <TouchableHighlight
            onPress={this.props.onPress}
            underlayColor='#e4083f'
            activeOpacity={0.5}
        >
            <View
                style={styles.setBtnStyle}>
                <Text
                    style={styles.textStyle}>
                    {this.props.title}
                </Text>
            </View>
        </TouchableHighlight>
    }
}


export default class MeScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                   <Button title="setLoggerEnable"
                        onPress={() => JPush.setLoggerEnable(true)
                        }/>

                <Button title="getRegisterID"
                        onPress={() => JPush.getRegistrationID(result =>
                            console.log("registerID:" + JSON.stringify(result))
                        )}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    setBtnStyle: {
        width: 320,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#3e83d7',
        borderRadius: 8,
        backgroundColor: '#3e83d7',
        padding: 10
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 25,
        color: '#ffffff'
    }
});