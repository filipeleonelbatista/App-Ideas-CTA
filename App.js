import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useFormik } from "formik";

import {
  Actionsheet,
  Button,
  FlatList,
  HStack,
  IconButton,
  Input,
  NativeBaseProvider,
  Text,
  useDisclose,
  VStack,
} from "native-base";
import { useEffect, useMemo, useState } from "react";
import { Alert, Keyboard, useWindowDimensions } from "react-native";
import * as Yup from "yup";
import CardTimer from "./components/CardTimer";

export default function App() {
  const { height } = useWindowDimensions();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [eventList, setEventList] = useState([]);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const maskDate = (value) => {
    const numeros = value.replace(/[^0-9]/g, "");
    if (numeros.length === 12) {
      const dia = numeros.slice(0, 2);
      const mes = numeros.slice(2, 4);
      const ano = numeros.slice(4, 8);
      const hora = numeros.slice(8, 10);
      const minutos = numeros.slice(10, 12);

      return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
    }
    return value;
  };

  const formSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required("O Campo Nome do evento é obrigatório!"),
      date: Yup.string().required("O Campo Data do evento é obrigatório!"),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => handleSubmitForm(values),
  });

  const handleDelete = async (index) => {
    Alert.alert(
      "Você deseja remover este item?",
      "Esta ação é irreverssível! Deseja continuar?",
      [
        {
          text: "Não",
          onPress: () => {},
        },
        {
          text: "Sim",
          onPress: async () => {
            const newEventList = eventList.filter(
              (_, currentIndex) => currentIndex !== index
            );

            await AsyncStorage.setItem(
              "@eventList",
              JSON.stringify([...newEventList])
            );
            setEventList([...newEventList]);
          },
        },
      ]
    );
  };

  const handleSubmitForm = async (formValues) => {
    await AsyncStorage.setItem(
      "@eventList",
      JSON.stringify([...eventList, formValues])
    );
    setEventList([...eventList, formValues]);
    onClose();
  };

  useEffect(() => {
    const executeAsync = async () => {
      const response = await AsyncStorage.getItem("@eventList");
      if (response !== null) {
        setEventList(JSON.parse(response));
      } else {
        await AsyncStorage.setItem("@eventList", JSON.stringify([]));
      }
    };
    executeAsync();
  }, []);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardOpen(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <VStack bgColor={"gray.100"} flex={1}>
        <VStack pt={6} px={4} h={150} bgColor={"yellow.400"}>
          <Text fontSize={24} bold py={4}>
            Listagem de eventos
          </Text>
        </VStack>
        <FlatList
          p={2}
          mt={-20}
          contentContainerStyle={{
            width: "100%",
            padding: 8,
          }}
          data={eventList}
          ListEmptyComponent={() => (
            <VStack
              w="100%"
              h={99}
              bgColor="gray.50"
              borderRadius={6}
              shadow={4}
              my={1}
              p={4}
              space={2}
              alignItems="center"
              justifyContent="center"
            >
              <Text>Sem eventos no momento!</Text>
            </VStack>
          )}
          renderItem={({ item, index }) => (
            <CardTimer
              handleDelete={() => handleDelete(index)}
              key={index}
              name={item.name}
              date={item.date}
            />
          )}
        />

        <Actionsheet
          isOpen={isOpen}
          onClose={onClose}
          h={height * (isKeyboardOpen ? 0.75 : 1)}
        >
          <Actionsheet.Content pb={isKeyboardOpen ? 24 : 6}>
            <VStack px={4} space={2}>
              <HStack w="100%" alignItems="center" mb={2}>
                <Text fontSize={24} bold w="100%" textAlign="center">
                  Adicione um evento
                </Text>
              </HStack>
              <Text>Nome do evento</Text>
              <Input
                errors={!!formik.errors.name}
                value={formik.values.name}
                onChangeText={(text) => formik.setFieldValue("name", text)}
                placeholder="Nome do evento"
                w="100%"
              />
              {formik.errors.name && (
                <Text color="red.600">{formik.errors.name}</Text>
              )}
              <Text>Data do evento</Text>
              <Input
                errors={!!formik.errors.date}
                value={formik.values.date}
                keyboardType="decimal-pad"
                onChangeText={(text) =>
                  formik.setFieldValue("date", maskDate(text))
                }
                placeholder="DD/MM/AAAA HH:mm"
                w="100%"
              />
              {formik.errors.date && (
                <Text color="red.600">{formik.errors.date}</Text>
              )}
              <Button
                bgColor={"yellow.400"}
                _text={{ color: "black", fontWeight: "bold" }}
                _pressed={{ bgColor: "yellow.600" }}
                onPress={formik.handleSubmit}
              >
                Adicionar
              </Button>
            </VStack>
          </Actionsheet.Content>
        </Actionsheet>

        <IconButton
          position="absolute"
          bottom={4}
          left={4}
          icon={<Feather name="plus" size={24} color="black" />}
          size={16}
          onPress={onOpen}
          _pressed={{
            bgColor: "yellow.600",
          }}
          bgColor="yellow.400"
          borderRadius="full"
          shadow={3}
        />
      </VStack>
    </NativeBaseProvider>
  );
}
