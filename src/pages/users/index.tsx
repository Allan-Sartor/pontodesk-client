import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
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
  useColorModeValue,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import NextLink from "next/link";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";


import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import { parseCookies } from "nookies";
import Card from "../../components/Card";
import { getAPIClient } from "../../services/axios";
import { Title } from "../../components/Title";
import { Pagination } from "../../components/Pagination";

export default function UserList({ users, pagination, error, isLoading }) {
  const bg = useColorModeValue('gray.50', 'gray.800');

  const [page, setPage] = useState(1);
  // const { data, isLoading, isFetching, error, refetch } = useUsers(page, {
  //   initialData: users,
  // });
  
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Card>
      <Box flex="1" borderRadius={8} bg={bg} p="8">
        <Title name="Pontodesk. | Usuários"/>
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Usuários

            {/* { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/> } */}
          </Heading>
        </Flex>

        { error ? (
          <Flex justify="center">
            <Text>Falha ao obter todos os chamados!</Text>
          </Flex>
        ) : (
          <>
            <Table colorScheme="white">
              <Thead>
                <Tr>
                  <Th px={["4", "4", "6"]} color="gray.300" width="8">
                    <Checkbox colorScheme="green" />
                  </Th>
                  <Th>Usuário</Th>
                  {isWideVersion && <Th>Data de cadastro</Th>}
                  <Th width="8"></Th>
                </Tr>
              </Thead>

              <Tbody>
                {users.map(user => {
                  return (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400">
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.created_at}</Td>}
                      <Td>
                        {isWideVersion && (
                          <Button
                            as="a"
                            size="sm"
                            cursor="pointer"
                            fontSize="sm"
                            variant="outline"
                            colorScheme="green"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            Editar
                          </Button>
                        )}
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>

            <Pagination 
                totalCountOfRegisters={pagination.totalItems}
                currentPage={pagination.current_page}
                registerPerPage={pagination.itemsPerPage}
                onPageChange={setPage}
              />
          </>
        )}
      </Box>
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

  const { data } = await apiClient.get("/usersall");

  if (data) {
    const users = data.users
    const pagination = data.pagination.meta

    return {
      props: {
        users,
        pagination,
      }
    }
  } else {
    const error = data.error

    return {
      props: {
        error
      }
    }
  }
  
}