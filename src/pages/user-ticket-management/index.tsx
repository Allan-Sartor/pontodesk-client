import { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

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

import { Layout } from '../../components/Layout';
import CardBox from '../../components/CardBox';
import { Title } from '../../components/Title';
import { getAPIClient } from '../../services/axios';
import { useRouter } from 'next/router';

export default function userTicketList({ ticketsOfUser }) {
  const Router = useRouter();
  const schemeColor = useColorModeValue('green', 'gray');
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  function handleShowTicketUser(ticket_id) {
    let id = ticket_id;

    console.warn(id)

    Router.push('/show-ticket/', ticket_id)
  }

  return (
    <Layout>
      <CardBox title="Meus chamados" buttonRedirect="/user-ticket-management/create">
        <>
          <Title name="Pontodesk. | Chamados" />

          {ticketsOfUser.length > 0 ?
            <Table colorScheme={schemeColor}>
              <Thead>
                <Tr>
                  <Th px={["4", "4", "6"]} color="gray.300" width="9">
                    ID
                  </Th>
                  <Th>Titulo</Th>
                  <Th>Status</Th>
                  {isWideVersion && <Th>Data de cadastro</Th>}
                  <Th width="8">Controles</Th>
                </Tr>
              </Thead>

              <Tbody>
                {ticketsOfUser.map(ticket => {
                  return (
                    <Tr key={ticket.id}>
                      <Td px={["4", "4", "6"]}>
                        <Text color="gray.300">{ticket.id}</Text>
                      </Td>

                      <Td>
                        <Box>
                          <Link color="green.400">
                            <Text fontWeight="bold">{ticket.title}</Text>
                          </Link>
                        </Box>
                      </Td>

                      {
                        ticket.call_status === true
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
                              .format(new Date(ticket.created_at))
                          }
                        </Td>
                      }

                      <Td>
                        {
                          isWideVersion && (
                            <Flex justify="center">
                              <Link 
                                href={`user-ticket-management/show-ticket/${encodeURIComponent(ticket.id)}`}
                              >
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
                              </Link>

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
    </Layout>
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

  const apiClient = await getAPIClient(context);
  const { data } = await apiClient.get("/calls");

  const ticketsOfUser = data;

  // console.warn('calls of user', ticketsOfUser)

  return {
    props: {
      ticketsOfUser
    }
  }
}