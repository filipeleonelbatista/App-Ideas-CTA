import React, { useState, useEffect } from 'react';
import { View, Text, Alert, AsyncStorage } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function AddEvent() {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [nameerror, setNameerror] = useState('');
    const [dateerror, setDateerror] = useState('');

    const [eventList, setEventList] = useState([]);

    const { navigate } = useNavigation();

    useEffect(() => {
        cleanErrorMessage();
    }, [name, date]);

    useEffect(() => {
        AsyncStorage.getItem('eventList').then(response => {
            if (response) {
                setEventList(JSON.parse(response));
            }
        })
    }, []);

    function cleanErrorMessage() {
        setDateerror('');
        setNameerror('');
    }

    function formValidate() {
        let error = true;
        const regex = /^(([0-2]?\d)|([3][01]))\/[0,1]?\d\/((199\d)|([2-9]\d{3}))\s[0-2]?[0-9]:[0-5][0-9]?$/;
        if (name === '') {
            setNameerror("O titulo do evento não pode ser vazio.");
            error = false;
        }
        if (date === '') {
            setDateerror("A data do evento não pode ser vazia.");
            error = false;
        } else {
            if (date.match(regex) == null) {
                setDateerror("Formato digitado da data é invalido.");
                error = false;
            } else {
                const eventDate = Date.parse(date);
                const nowDate = Date.now();
                if (eventDate < nowDate) {
                    setDateerror("A data nao pode ser menor do que a data atual.");
                    error = false;
                }
            }
        }
        return error;
    }

    async function onSubmitEvent() {
        if (formValidate()) {
            const item = {
                name,
                date,
            };
            let itemsArray = [];

            eventList.forEach(element => {
                itemsArray.push(element);
            });
            
            itemsArray.push(item);

            await AsyncStorage.setItem('eventList', JSON.stringify(itemsArray))

            handleNavigateToList();
        }
    }

    function handleNavigateToList() {
        navigate('List');
    }
    return (
        <View style={styles.container} >
            <Header title="Adicionar Evento">
                <RectButton onPress={handleNavigateToList} style={styles.headerButton} >
                    <Feather name="arrow-left" size={24} color="#000" />
                </RectButton>
            </Header>

            <View style={styles.main} >
                <View style={styles.formGroup} >
                    <View style={styles.inputGroup} >
                        <Text style={styles.label} >Nome do evento</Text>
                        <TextInput style={styles.input}
                            value={name}
                            onChangeText={text => setName(text)}
                            placeholder="Digite o nome do evento" />
                        {nameerror === '' ? <Text style={styles.labelError}></Text> : <Text style={styles.labelError}>{nameerror}</Text>}

                    </View>
                    <View style={styles.inputGroup} >
                        <Text>Data do evento</Text>
                        <TextInput style={styles.input}
                            value={date}
                            onChangeText={text => setDate(text)}
                            placeholder="DD/MM/AAAA HH:mm" />
                        {dateerror === '' ? <Text style={styles.labelError}></Text> : <Text style={styles.labelError}>{dateerror}</Text>}
                    </View>
                    <View style={styles.inputGroup} >
                        <RectButton onPress={onSubmitEvent} style={styles.buttonAdd}>
                            <Text style={styles.buttonAddText}>
                                Adicionar evento
                            </Text>
                        </RectButton>
                    </View>
                </View>
            </View>


            <Footer />
        </View>
    );
}

export default AddEvent;