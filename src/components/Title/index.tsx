import Head from 'next/head';
import React from 'react';

type TitleProps = {
  name: string;
}

export function Title({name}: TitleProps) {
  return (
    <Head>
      <title>{name}</title>
    </Head>
  );
}
