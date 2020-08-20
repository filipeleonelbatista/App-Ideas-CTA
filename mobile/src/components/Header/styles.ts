import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        paddingTop: 32,
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#FBDC25',
        width: '100%',
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerRow: {
        marginBottom: 46,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#000',
        fontSize: 18,
    }
});

export default styles;