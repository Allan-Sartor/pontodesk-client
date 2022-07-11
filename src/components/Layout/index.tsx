import { Flex } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

type LayoutProps = {
  children?: ReactElement;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Flex
      direction="column"
      height="100vh"
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray',
          borderRadius: '24px',
        },
      }}
    >
      <Header />
      <Flex w="100%" maxWidth={1480} my="6" mx="auto" px="6">
        <Sidebar />
        { children }
      </Flex>
    </Flex>
  )
}
