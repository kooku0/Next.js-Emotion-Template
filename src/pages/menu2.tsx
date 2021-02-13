import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';

import { IsMobileContext } from '@/context/isMobileContext';
import SectionContainer from '@/styles/container/SectionContainer';

const Container = styled.section`
  ${SectionContainer}
  height: 1000px;
  background-color: ${({ theme }) => theme.color.blue50};

  ${({ theme }) => theme.media.mobile} {
    background-color: ${({ theme }) => theme.color.green50};
  }
`;

const Menu2: React.FC = () => {
  const isMobile = useContext(IsMobileContext);

  return (
    <>
      <Head>
        <title>Menu2</title>
      </Head>

      <Container>{!isMobile ? 'Desktop' : 'Mobile'}</Container>
    </>
  );
};

export default Menu2;
