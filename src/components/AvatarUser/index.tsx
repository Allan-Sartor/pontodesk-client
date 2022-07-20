import { Avatar, HStack, Link, Text } from '@chakra-ui/react';
import React from 'react';

export default function AvatarUser() {
  return (
    <HStack spacing={["2", "4"]} bg="gray.800" borderRadius={6} p={2}>
      <Avatar name='Dan Abrahmov' size='md' src='https://bit.ly/dan-abramov' />
      <Link color="purple.400">
        <Text fontWeight="bold" mr={1}>Allan Sartor</Text>
      </Link>
    </HStack>
  );
}
