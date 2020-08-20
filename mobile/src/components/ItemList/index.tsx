import React, { useEffect, useState } from "react";
import { View, Text, Alert, AsyncStorage } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import { useFocusEffect } from "@react-navigation/native";

interface eventItem {
    name: string,
    date: string
}
interface ItemListProps {
    eventItem: eventItem,
}

const ItemList: React.FC<ItemListProps> = eventItem => {
    const { date, name } = eventItem.eventItem;

    const [eventList, setEventList] = useState([]);
    
    useEffect(() => {        
        loadItens();
        return () => {}
    }, [eventList])

    async function loadItens() {
        await AsyncStorage.getItem('eventList').then(response => {
            if (response) {
                const result = JSON.parse(response);
                setEventList(result.reverse());
            }
        })
    }

    async function setnewlist() {
        await loadItens();
        let newEventList = [];
        eventList.forEach(event => {
            if (event.name != name) {           
                newEventList.push(event)
            }
        });
                    
        await AsyncStorage.setItem('eventList', JSON.stringify(newEventList.reverse()))
    }
    function deleteThis() {
        Alert.alert("Deseja excluir?", "Evento " + name, [
            { text: 'Não', onPress: () => { } },
            { text: 'Sim', onPress: () => { setnewlist(); } }
        ])
    }
    const calculateTimeLeft = () => {
        const [dia, hora] = date.split(' ');

        const [DD, MM, YYYY] = dia.split('/');

        const [HH, Min] = hora.split(':');

        const dateMeta = new Date(parseInt(YYYY), (parseInt(MM) - 1), parseInt(DD), parseInt(HH), parseInt(Min), 0, 0).getTime();

        const now = new Date().getTime();

        const difference = dateMeta - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000)
            };
        }else{
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        return timeLeft;
    };


    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    }, [timeLeft]);

    return (
        <View style={styles.item} >
            <View style={styles.itemRow} >
                <View style={styles.itemColumn2} >
                    <Text style={styles.itemTitle} >{name}</Text>
                    <Text style={styles.itemLabel} >Data do evento: {date}</Text>
                </View>
                <RectButton onPress={deleteThis} style={styles.itemButton} >
                    <Feather name="trash" size={18} color="#000" />
                </RectButton>
            </View>

            { timeLeft.seconds === 0
            ?<View style={styles.itemRow} >
                <View style={styles.itemColumn} >
                    <Text style={styles.itemValue} >Evento Finalizado</Text>
                </View>
            </View>
            :<View style={styles.itemRow} >
                <View style={styles.itemColumn} >
                    <Text style={styles.itemValue} >{timeLeft.days}</Text>
                    <Text style={styles.itemLabel} >Dias</Text>
                </View>
                <View style={styles.itemColumn} >
                    <Text style={styles.itemValue} >{timeLeft.hours}</Text>
                    <Text style={styles.itemLabel} >Horas</Text>
                </View>
                <View style={styles.itemColumn} >
                    <Text style={styles.itemValue} >{timeLeft.minutes}</Text>
                    <Text style={styles.itemLabel} >Min.</Text>
                </View>
                <View style={styles.itemColumn} >
                    <Text style={styles.itemValue} >{timeLeft.seconds}</Text>
                    <Text style={styles.itemLabel} >Seg.</Text>
                </View>
            </View>
            }
        </View>
    );
}

export default ItemList;