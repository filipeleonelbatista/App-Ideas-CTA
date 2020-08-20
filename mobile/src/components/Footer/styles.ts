import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#CCC',
        width: '100%',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerButton: {
        backgroundColor: '#2AD131',
        width: '90%',
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        borderRadius: 8,
    },
    footerButtonText: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#FFF',
        fontSize: 12,
    }
});

export default styles;