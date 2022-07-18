import React from 'react';
import { CardBox } from '../../../components/CardBox';
import { Layout } from '../../../components/Layout';
import { useRouter } from 'next/router'
import { Title } from '../../../components/Title';
import { useQuery } from 'react-query';
import { getAPIClient } from '../../../services/axios';

export default function showTicket() {
  const { query } = useRouter();
  const { data, isLoading, isError } = useQuery('calls', async () => {
    const apiClient = await getAPIClient();
    const callID = await query.id;
    const { data } = await apiClient.get(`calls_find/${callID}`);

    return data;
  });
  
  console.warn(data);

  return (
    <Layout>
      <CardBox title="Chamado aberto">
        <>
          <Title name="Pontodesk. | Chamado" />

          {query.id}
        </>
      </CardBox>
    </Layout>
  );
}
