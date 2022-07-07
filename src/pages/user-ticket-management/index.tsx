import { useContext } from 'react';
import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
import { getAPIClient } from '../../services/axios';
import { parseCookies } from 'nookies';

import { RiCheckLine, RiEyeLine, RiPencilLine } from 'react-icons/ri';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useColorModeValue
} from '@chakra-ui/react';

import Card from '../../components/Card';
import CardBox from '../../components/CardBox';
import { Title } from '../../components/Title';

import { CallsProps } from '../../services/interfaces/calls';

import { AuthContext } from '../../services/contexts/AuthContext';

export default function userTicketList() {
  const { user } = useContext(AuthContext);
  const schemeColor = useColorModeValue('green', 'gray');
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Card>
      {user ?
        user.admin === true ?
          <CardBox title="Chamados em aberto">
            <>
              
              
            </>
          </CardBox>
          :
          <CardBox title="Meus chamados" buttonRedirect="/user-ticket-management/create">
            <>
              <Title name="Pontodesk. | Chamados" />

              {user.call.length > 0 ?
                <Table colorScheme={schemeColor}>
                  <Thead>
                    <Tr>
                      <Th px={["4", "4", "6"]} color="gray.300" width="8">
                        <Checkbox colorScheme="green" />
                      </Th>
                      <Th>Titulo</Th>
                      <Th>Status</Th>
                      {isWideVersion && <Th>Data de cadastro</Th>}
                      <Th width="8">Controles</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {user.call.map(call => {
                      return (
                        <Tr key={call.id}>
                          <Td px={["4", "4", "6"]}>
                            <Checkbox colorScheme="green" />
                          </Td>

                          <Td>
                            <Box>
                              <Link color="green.400">
                                <Text fontWeight="bold">{call.title}</Text>
                              </Link>
                            </Box>
                          </Td>

                          {
                            call.call_status === true
                              ?
                              <Td>
                                <Text fontWeight="bold" color="yellow.400">Aberto</Text>
                              </Td>
                              :
                              <Td>
                                <Text fontWeight="bold" color="green.400">Resolvido</Text>
                              </Td>
                          }

                          {
                            isWideVersion && <Td>
                              {
                                new Intl.DateTimeFormat("pt-br")
                                  .format(new Date(call.created_at))
                              }
                            </Td>
                          }

                          <Td>
                            {
                              isWideVersion && (
                                <Flex justify="center">
                                  <Button
                                    as="a"
                                    size="sm"
                                    cursor="pointer"
                                    fontSize="sm"
                                    colorScheme="green"
                                    leftIcon={<Icon as={RiPencilLine} fontSize="20" />}
                                    variant='outline'
                                  >
                                    Editar
                                  </Button>

                                  <Button
                                    as="a"
                                    size="sm"
                                    cursor="pointer"
                                    fontSize="sm"
                                    colorScheme="green"
                                    leftIcon={<Icon as={RiEyeLine} fontSize="20" />}
                                    variant='outline'
                                  >
                                    Visualizar
                                  </Button>

                                  <Button
                                    as="a"
                                    size="sm"
                                    cursor="pointer"
                                    fontSize="sm"
                                    colorScheme="green"
                                    leftIcon={<Icon as={RiCheckLine} fontSize="20" />}
                                    variant='outline'
                                  >
                                    Resolver
                                  </Button>
                                </Flex>
                              )}
                          </Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
                :
                <>
                  <Text>Você não possui chamados</Text>
                </>
              }
            </>
          </CardBox>
        :
        <>
          <Text>Você não está autenticado!</Text>
        </>
      }
    </Card>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ['pontodesk.token']: token } = parseCookies(context);


  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }



  return {
    props: {
      // calls,
    }
  }
}