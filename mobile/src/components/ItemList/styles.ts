import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    item: {
        marginVertical: 8,
        width: '90%',
        backgroundColor: '#FFF',
        elevation: 8,
        borderRadius: 8,
        padding: 18,
    },
    itemButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemColumn2: {
        flexDirection: 'column'
    },
    itemTitle: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#000',
        fontSize: 18,
    },
    itemValue: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#000',
        fontSize: 32,
    },
    itemLabel: {
        fontFamily: 'Poppins_400Regular',
        color: '#000',
        fontSize: 12,
    },
});

export default styles;