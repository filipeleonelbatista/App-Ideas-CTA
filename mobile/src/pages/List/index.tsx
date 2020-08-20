import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, Image, Text } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import styles from './styles';

import imgNotFound from '../../../assets/404.png';
import ItemList from '../../components/ItemList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function List() {

    const { navigate } = useNavigation();

    const [eventList, setEventList] = useState([]);

    useFocusEffect(() => {
        loadItens();
    });

    async function loadItens() {
        await AsyncStorage.getItem('eventList').then(response => {
            if (response) {
                const result = JSON.parse(response);
                setEventList(result.reverse());
            }
        })
    }
    function handleNavigateToAddEvent() {
        navigate('AddEvent');
    }
    return (
        <View style={styles.container} >
            <Header title="Listagem de eventos">
                <RectButton onPress={handleNavigateToAddEvent} style={styles.headerButton} >
                    <Feather name="plus" size={24} color="#000" />
                </RectButton>
            </Header>

            <View style={styles.main} >
                <ScrollView style={{ width: '100%', marginTop: -50 }}
                    contentContainerStyle={{ alignItems: 'center' }}>

                    {
                        eventList.length === 0
                        ? <View style={{marginTop: 90, justifyContent:'center', alignItems:'center'}}>
                            <Image source={imgNotFound} style={{ width: 350, height: 150}} />
                            <Text style={{marginTop: 16, justifyContent:'center', alignItems:'center'}}>Não foram encontrados eventos</Text>
                         </View>
                        : eventList.map((eventItem, index) => {
                            return (
                                <ItemList key={index} eventItem={eventItem} />
                            );
                        })
                    }
                </ScrollView>



                <Footer />

            </View>
        </View>
    );
}

export default List;