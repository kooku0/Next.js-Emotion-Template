import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';

import { IsMobileContext } from '@/context/isMobileContext';
import SectionContainer from '@/styles/container/SectionContainer';

const Container = styled.div`
  height: 1000px;
  background-color: ${({ theme }) => theme.color.blue500};

  ${({ theme }) => theme.media.mobile} {
    background-color: ${({ theme }) => theme.color.green500};
  }
`;

const Section = styled.section`
  ${SectionContainer};
  padding-top: 200px;
`;

const Menu3: React.FC = () => {
  const isMobile = useContext(IsMobileContext);

  return (
    <>
      <Head>
        <title>Menu3</title>
      </Head>

      <Container>
        <Section>{!isMobile ? 'Desktop' : 'Mobile'}</Section>
      </Container>
    </>
  );
};

export default Menu3;
