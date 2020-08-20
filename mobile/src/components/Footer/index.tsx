import React from 'react';
import { View, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

function Footer() {
    return (
    <View style={styles.footer} >
        <RectButton onPress={() => { Linking.openURL("https://github.com/modernfunkboss/"); }} style={styles.footerButton} >
            <Text style={styles.footerButtonText} >Veja mais projetos no Github</Text>
        </RectButton>
    </View>
    );

}
export default Footer;