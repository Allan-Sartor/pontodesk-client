import {
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  RiNotificationLine,
} from "react-icons/ri";

import ButtonNav from "./ButtonNav";

export function NotificationNav() {
  const bg = useColorModeValue('gray.400', 'gray.500');

  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color={bg}
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <ButtonNav title="Notificações" onclick={() => {}} icon={RiNotificationLine} />
    </HStack>
  );
}
