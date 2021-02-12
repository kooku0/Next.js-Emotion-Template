import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';

import { IsMobileContext } from '@/context/isMobileContext';

const Container = styled.div`
  height: 1000px;
  background-color: ${({ theme }) => theme.color.blue50};

  ${({ theme }) => theme.media.mobile} {
    background-color: ${({ theme }) => theme.color.green50};
  }
`;

const Home: React.FC = () => {
  const isMobile = useContext(IsMobileContext);

  return (
    <>
      <Head>
        <title>MAIN</title>
      </Head>

      <Container>{!isMobile ? 'Desktop' : 'Mobile'}</Container>
    </>
  );
};

export default Home;
