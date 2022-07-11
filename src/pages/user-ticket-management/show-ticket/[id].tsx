import React from 'react';
import CardBox from '../../../components/CardBox';
import { Layout } from '../../../components/Layout';
import { useRouter } from 'next/router'
import { Title } from '../../../components/Title';

export default function showTicket() {
  const { query } = useRouter();

  console.warn(query.id);

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
