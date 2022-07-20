
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useQuery } from 'react-query';

import { getAPIClient } from '../../../services/axios';

import {
  Flex,
  Icon,
  Spinner,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';

import { CardBox } from '../../../components/CardBox';
import { Layout } from '../../../components/Layout';
import { Title } from '../../../components/Title';
import AvatarUser from '../../../components/AvatarUser';

export default function showTicketManagement({ ticketId }) {
  const { data, isLoading, isError } = useQuery('calls_find', async () => {
    const apiClient = await getAPIClient();
    const { data } = await apiClient.get(`calls_find/${ticketId}`);

    return data;
  });

  // const color = useColorModeValue('gray.', 'gray.300');

  return (
    <Layout>
      <CardBox title="Chamado">
        <>
          <Title name="Pontodesk. | Visualizar Ticket" />

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
                <VStack spacing={["3", "6"]} >
                  <Flex justify="space-between" w="100%">
                    <Flex
                      bg="gray.900"
                      p={3}
                      borderRadius={6}
                      justify="flex-start"
                      w="100%"
                    >
                      <Flex justify="center" flexDirection="column">
                        <Text color="gray.300" fontSize="md" fontWeight="bold">
                          Titulo
                        </Text>
                        <Text>{data.call.title}</Text>
                      </Flex>
                    </Flex>
                    <Flex
                      bg="gray.900"
                      borderRadius={6}
                      p={3}
                      ml={2}
                      justify="flex-end"
                    >
                      <Flex justify="center" flexDirection="column">
                        <Text color="gray.300" fontSize="md" fontWeight="bold">
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

                  <Flex justify="space-between" w="100%">
                    <Flex
                      bg="gray.900"
                      p={3}
                      borderRadius={6}
                      w="33%"
                      mr={2}
                    >
                      <Flex justify="center" flexDirection="column">
                        <Text color="gray.300" fontSize="md" fontWeight="bold">
                          N° Anydesk
                        </Text>
                        <Text>{data.call.anydesk_number}</Text>
                      </Flex>
                    </Flex>

                    <Flex
                      bg="gray.900"
                      p={3}
                      borderRadius={6}
                      w="33%"
                    >
                      <Flex justify="center" flexDirection="column">
                        <Text color="gray.300" fontSize="md" fontWeight="bold">
                          Setor
                        </Text>
                        <Text>Desenvolvimento</Text>
                      </Flex>

                    </Flex>

                    <Flex
                      bg="gray.900"
                      borderRadius={6}
                      p={3}
                      ml={2}
                      w="33%"
                    >
                      <Flex justify="center">
                        <Text color="gray.300" fontSize="md" fontWeight="bold" mr={2}>
                          Criado por:
                        </Text>
                        <AvatarUser />
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex justify="space-between" w="100%">
                    <Flex
                      bg="gray.900"
                      p={3}
                      borderRadius={6}
                      justify="flex-start"
                      w="100%"
                    >
                      <Flex justify="center" flexDirection="column">
                        <Text color="gray.300" fontSize="md" fontWeight="bold" mr={2}>
                          Descrição
                        </Text>
                        <Text>{data.call.description}</Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Text>{data.call.image_url}</Text>
                </VStack>
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
