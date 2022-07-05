import { Box, Button, Flex, Heading, Icon, useColorModeValue } from '@chakra-ui/react';
import NextLink from "next/link";
import React, { ReactElement } from 'react';
import { RiAddLine } from 'react-icons/ri';

type CardBoxProps = {
  title: string;
  buttonRedirect?: string;
  children?: ReactElement;
}
export default function CardBox({ title, buttonRedirect, children }: CardBoxProps) {
  const bg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box
      flex="1"
      borderRadius={8}
      bg={bg}
      p="8"
    >
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          {title}
        </Heading>

        {
          buttonRedirect ?
            <NextLink href={buttonRedirect}>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                cursor="pointer"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
            :
            <></>
        }

      </Flex>
      {children}
    </Box>
  );
}
