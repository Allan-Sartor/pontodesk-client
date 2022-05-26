import { Box, SimpleGrid } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { parseCookies } from 'nookies'
import Card from "../components/Card";
import { Charts } from "../components/Charts";
import { getAPIClient } from "../services/axios";

export default function Dashboard() {
  return (
    <Card>
      <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
          >
            <Charts title="Total de chamados hoje" />
          </Box>

          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
          >
            <Charts title="Total de chamados na semana" />
          </Box>

        </SimpleGrid>
    </Card>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apiClient = getAPIClient(context);
  const {
    ['pontodesk.uid']: uid,
    ['pontodesk.client']: client,
    ['pontodesk.access_token']: access_token 
  } = parseCookies(context)

  if (!access_token && !uid && !client) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  return {
    props: {}
  }
}