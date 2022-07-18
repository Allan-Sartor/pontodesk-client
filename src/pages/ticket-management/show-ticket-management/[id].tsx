
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useQuery } from 'react-query';

import { getAPIClient } from '../../../services/axios';

import {
  Box,
  Flex,
  Icon,
  Spinner,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

import { CardBox } from '../../../components/CardBox';
import { Layout } from '../../../components/Layout';
import { Title } from '../../../components/Title';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';

export default function showTicketManagement({ ticketId }) {
  const { data, isLoading, isError } = useQuery('calls_find', async () => {
    const apiClient = await getAPIClient();
    const { data } = await apiClient.get(`calls_find/${ticketId}`);

    return data;
  });

  const color = useColorModeValue('gray.200', 'gray.300');

  return (
    <Layout>
      <CardBox title="Chamado aberto">
        <>
          <Title name="Pontodesk. | Chamado" />

          {
            isLoading ?
              <Flex justify="center">
                <Spinner />
              </Flex>
              :
              isError ?
                <Flex justify="center">
                  <Text>Não foi possivel carregar as informações do ticket!</Text>
                </Flex>
                :
                <Flex flexDirection="column">
                  <Flex justify="space-between">
                    <Flex
                      bg={color}
                      p={3}
                      borderRadius={6}
                      justify="flex-start"
                      w="100%"
                    >
                      <Flex justify="center" flexDirection="column">
                        <Text>
                          Titulo
                        </Text>
                        <Text>{data.call.title}</Text>
                      </Flex>
                    </Flex>
                    <Flex
                      bg={color}
                      borderRadius={6}
                      p={3}
                      ml={2}
                      justify="flex-end"
                    >
                      <Flex justify="center" flexDirection="column">
                        <Text>
                          Prioridade
                        </Text>
                        {
                          data.call.priority_level == "Baixo"
                            ?
                            (
                              <Flex flexDirection="row">
                                <Icon as={RiCheckboxBlankCircleFill} pt={1} color="green" />
                                <Text>{data.call.priority_level}</Text>
                              </Flex>
                            ) : data.call.priority_level == "Médio"
                              ? (
                                <Flex flexDirection="row">
                                  <Icon as={RiCheckboxBlankCircleFill} pt={1} color="yellow" />
                                  <Text>{data.call.priority_level}</Text>
                                </Flex>
                              ) : data.call.priority_level === "Alto" ? (
                                <Flex flexDirection="row">
                                  <Icon as={RiCheckboxBlankCircleFill} pt={1} color="red" />
                                  <Text>{data.call.priority_level}</Text>
                                </Flex>
                              ) :
                                <>Not status</>
                        }
                      </Flex>
                    </Flex>
                  </Flex>



                  <Flex justify="space-between">
                    <Flex
                      bg={color}
                      p={3}
                      borderRadius={6}
                      justify="flex-start"
                      w="100%"
                    >
                      <Flex justify="center" flexDirection="column">
                        <Text>
                          N° Anydesk
                        </Text>
                        <Text>{data.call.anydesk_number}</Text>
                      </Flex>

                    </Flex>
                    <Flex
                      bg={color}
                      borderRadius={6}
                      p={3}
                      ml={2}
                      justify="flex-end"
                    >
                      <Flex justify="center" flexDirection="column">
                        <Text>
                          Chamado aberto por:
                        </Text>
                        <Text>{data.call.user_id}</Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex justify="space-between">
                    <Flex
                      bg={color}
                      p={3}
                      borderRadius={6}
                      justify="flex-start"
                      w="100%"
                    >
                      <Flex justify="center" flexDirection="column">
                        <Text>
                          Descrição
                        </Text>
                        <Text>{data.call.description}</Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Text>{data.call.image_url}</Text>
                </Flex>
          }
        </>
      </CardBox>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ['pontodesk.token']: token } = parseCookies(context);
  const ticketId = context.params.id;

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
      ticketId
    }
  }
}
