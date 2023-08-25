import { Feather } from "@expo/vector-icons";
import { HStack, IconButton, Text, VStack } from "native-base";
import { useEffect, useState } from "react";

export default function CardTimer({ name, date, handleDelete }) {
  const calculateTimeLeft = () => {
    const [dia, hora] = date.split(" ");

    const [DD, MM, YYYY] = dia.split("/");

    const [HH, Min] = hora.split(":");

    const dataMeta = new Date(
      parseInt(YYYY),
      parseInt(MM) - 1,
      parseInt(DD),
      parseInt(HH),
      parseInt(Min, 0, 0)
    ).getTime();

    const now = new Date().getTime();

    const difference = dataMeta - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <VStack
      w="100%"
      bgColor="gray.50"
      borderRadius={6}
      shadow={4}
      my={1}
      p={4}
      space={2}
    >
      <HStack
        justifyContent={"space-between"}
        w={"100%"}
        space={2}
        alignItems="center"
      >
        <HStack justifyContent={"space-between"} flex={1} alignItems="center">
          <Text bold fontSize={18}>
            {name}
          </Text>
          <Text fontSize={14}>{date}</Text>
        </HStack>
        <IconButton
          size={8}
          icon={<Feather name="trash" size={18} color="red" />}
          onPress={handleDelete}
          _pressed={{
            bgColor: "gray.200",
          }}
          bgColor="gray.50"
          borderRadius="full"
        />
      </HStack>
      <HStack justifyContent={"space-evenly"}>
        <VStack alignItems={"center"} py={1}>
          <Text fontSize={32} bold lineHeight={32}>
            {timeLeft.days}
          </Text>
          <Text lineHeight={14}>Dias</Text>
        </VStack>

        <VStack alignItems={"center"} py={1}>
          <Text fontSize={32} bold lineHeight={32}>
            {timeLeft.hours}
          </Text>
          <Text lineHeight={14}>Horas</Text>
        </VStack>

        <VStack alignItems={"center"} py={1}>
          <Text fontSize={32} bold lineHeight={32}>
            :
          </Text>
        </VStack>

        <VStack alignItems={"center"} py={1}>
          <Text fontSize={32} bold lineHeight={32}>
            {timeLeft.minutes}
          </Text>
          <Text lineHeight={14}>Min</Text>
        </VStack>

        <VStack alignItems={"center"} py={1}>
          <Text fontSize={32} bold lineHeight={32}>
            :
          </Text>
        </VStack>

        <VStack alignItems={"center"} py={1}>
          <Text fontSize={32} bold lineHeight={32}>
            {timeLeft.seconds}
          </Text>
          <Text lineHeight={14}>Seg</Text>
        </VStack>
      </HStack>
    </VStack>
  );
}
