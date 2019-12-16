import React ,{Component} from 'react';
import { StyleSheet,View,Text} from 'react-native';

export default class MeScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text> MeScreen </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});