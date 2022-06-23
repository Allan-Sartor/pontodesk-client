import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, Box, Button, Center, Divider, Flex, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import Router from "next/router";
import { destroyCookie } from "nookies";
import React, { useContext } from "react";
import { RiContactsLine, RiLogoutBoxLine, RiMenuLine, RiShieldUserLine } from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";
interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const cancelRef = React.useRef();

  const color = useColorModeValue('gray.200', 'gray.300');

  function handleLogoutUser() {
    destroyCookie(null, 'pontodesk.token');

    toast({
      title: 'Logout realizado com sucesso!',
      position: 'top-right',
      status: 'success',
      duration: 2000, // 2 seconds
      isClosable: true,
    })

    Router.push('/');
  }

  return (
    <>
      <Menu>
        <MenuButton as={Button} py={7}>
          <Flex align="center">
            {
              showProfileData &&
              (
                <>
                  <Flex textAlign="right" direction="column" mr={2}>
                    <Text fontSize="md">
                      {user ? user.name : ''}
                    </Text>
                    <Text color={color} fontSize="sm">
                      {user ? user.email : ''}
                    </Text>
                  </Flex>
                  <Center height={8}>
                    <Divider orientation='vertical' />
                  </Center>
                </>
              )
            }

            <Avatar ml={showProfileData ? '3' : ''} size="sm" name={user ? user.name : ''} src="" />
          </Flex>
        </MenuButton>
        <MenuList fontSize="md">
          <MenuItem
            icon={<RiShieldUserLine size="20" />}
          >
            Meus dados
          </MenuItem>
          <MenuItem
            icon={<RiLogoutBoxLine size="20" />}
            onClick={onOpen}
          >
            Sair
          </MenuItem>
        </MenuList>
      </Menu>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Sair
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja sair da plataforma ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='green' onClick={handleLogoutUser} ml={3}>
                Sair
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
