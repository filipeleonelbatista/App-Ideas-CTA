import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headerButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FBDC25',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 32,
        paddingTop: 16,
    },
    label: {
        color: '#000',
        fontFamily: 'Poppins_400Regular',
    },
    labelError: {
        color: '#F00',
        fontFamily: 'Poppins_400Regular',
        textAlign:"center",
        marginTop: 4,
    },
    formGroup: {
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: 5,
    },
    buttonAdd: {
        backgroundColor: '#2AD131',
        width: '100%',
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        borderRadius: 8,
        marginTop:16,
    },
    buttonAddText: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#FFF',
        fontSize: 12,
    },
    input: {
        height: 54,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
    }
});

export default styles;