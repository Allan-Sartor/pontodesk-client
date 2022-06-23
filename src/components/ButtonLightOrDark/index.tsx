import { Button, Icon, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'

export default function ButtonLightOrDark({...rest}) {
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Button
      w="12"
      h="12"
      p="7"
      bg={bg}
      onClick={toggleColorMode}
      {...rest}
    >
      {colorMode === 'light' ?
        <Icon as={RiMoonLine} fontSize="20" />
        :
        <Icon as={RiSunLine} fontSize="20" />
      }
    </Button>
  )
}
