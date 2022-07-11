import { Box, Button, Checkbox, Flex, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { RiCheckLine, RiEyeLine, RiPencilLine } from 'react-icons/ri'
import { useQuery } from 'react-query'
import { Layout } from '../../components/Layout'
import CardBox from '../../components/CardBox'
import { Title } from '../../components/Title'
import { getAPIClient } from '../../services/axios'

export default function ticketList() {
  const { data, isLoading, isError } = useQuery('calls', async () => {
    const apiClient = await getAPIClient();
    const { data } = await apiClient.get("/calls_all");

    return data;
  });
  const schemeColor = useColorModeValue('green', 'gray');
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Layout>
      <CardBox title="Chamados em aberto">
        <>
          <Title name="Pontodesk. | Chamados" />

          {
            isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : isError ? (
              <Text>Não foi possível carregar os chamados!</Text>
            ) : (
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
                  {data.map(call => {
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

              //  <Pagination 
              //     totalCountOfRegisters={pagination.meta.totalItems}
              //     currentPage={pagination.meta.current_page}
              //     registerPerPage={pagination.meta.itemsPerPage}
              //     onPageChange={setPage}
              //   />
            )
          }
        </>
      </CardBox>
    </Layout>
  )
}
