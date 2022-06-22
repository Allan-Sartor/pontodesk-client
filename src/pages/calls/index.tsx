import { GetServerSideProps } from 'next';

import { parseCookies } from 'nookies';

import { Box, Button, Checkbox, Flex, Icon, Link, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';

import Card from '../../components/Card';
import CardBox from '../../components/CardBox';

import { getAPIClient } from '../../services/axios';
import { RiCheckLine, RiEyeLine, RiPencilLine } from 'react-icons/ri';
import { Title } from '../../components/Title';

type CallsProps = {
  calls: Call[];
}

type Call = {
  id: number;
  title: string;
  priority_level: string;
  anydesk_number: number;
  description: string;
  call_status: boolean;
  created_at: Date;
  image_url: string;
}

export default function CallsList({ calls }: CallsProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const schemeColor = useColorModeValue('green', 'gray')

  return (
    <Card>
      <CardBox title="Chamados em aberto" buttonRedirect="/calls/create">
        <>
          <Title name="Pontodesk. | Chamados"/>
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
              {calls.map(call => {
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

          {/* <Pagination 
                totalCountOfRegisters={pagination.meta.totalItems}
                currentPage={pagination.meta.current_page}
                registerPerPage={pagination.meta.itemsPerPage}
                onPageChange={setPage}
              /> */}
        </>
      </CardBox>
    </Card>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ['pontodesk.token']: token } = parseCookies(context)
  const apiClient = await getAPIClient(context)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const { data } = await apiClient.get("/calls_all");
  const calls = data
  // const pagination = data.pagination.meta



  return {
    props: {
      calls
    }
  }
}