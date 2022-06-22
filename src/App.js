
import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
    const [toggle, setToggle] = useState(false);
    const srcLightOn = '../assets/icon/light-on.jpg';
    const srcLightOff = '../assets/icon/light-off.jpg';
    const handleToggle = () => { setToggle(oldToggle => !oldToggle) }

    useEffect(
        () => {
            //Alert.alert(`clicou ${toggle}`)
            Torch.switchState(toggle)
        }, [toggle]
    )

    useEffect(() => {
        const subscription = RNShake.addListener(() => {
            setToggle(oldToggle => !oldToggle)
        });
        return () => subscription.remove();
    }, [])
    return (
        <SafeAreaView style={toggle ? style.containerLight : style.containerDark} >
            <TouchableOpacity
                onPress={handleToggle}>
                <View >
                    <Image source={toggle ? require(srcLightOn) : require(srcLightOff)}
                        style={toggle ? style.imageOn : style.imageOff} />
                </View>
            </TouchableOpacity>
        </SafeAreaView >
    );
}

export default App;

const style = StyleSheet.create({
    containerLight: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerDark: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageOn: {
        alignSelf: 'center',
        width: 400,
        height: 400,
        resizeMode: 'contain',
    },
    imageOff: {
        alignSelf: 'center',
        width: 400,
        height: 400,
        resizeMode: 'contain',
        tintColor: 'white',
    },
});