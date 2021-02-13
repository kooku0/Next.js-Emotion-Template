import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mdiClose, mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import ActiveLink from '@/components/navigation/ActiveLink';
import { IsMobileContext } from '@/context/isMobileContext';
import SectionContainer from '@/styles/container/SectionContainer';

const Nav = styled.nav<{ transparent: boolean; isHome: boolean }>`
  ${({ theme }) => theme.media.desktop} {
    height: 64px;
    transition: background-color 0.2s linear;
  }
  ${({ theme }) => theme.media.tablet} {
    height: 64px;
    transition: background-color 0.2s linear;
  }
  ${({ theme }) => theme.media.mobile} {
    height: 56px;
    transition: background-color ${({ transparent }) => (transparent ? '0.5s' : '0s')} ease-in-out;
  }

  background-color: ${({ transparent }) => (transparent ? 'transparent' : 'white')};
  box-shadow: inset 0 -1px 0 0 ${({ transparent, theme }) => (transparent ? 'transparent' : theme.color.grey200)};
  display: flex;
  align-items: center;
  position: ${({ isHome }) => (isHome ? 'fixed' : 'sticky')};
  width: 100%;
  top: 0;
  z-index: 999;
`;

const NavContainer = styled.div`
  ${SectionContainer};

  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const NavLogo = styled(Image)`
  width: 80px;
  height: 24px;
  cursor: pointer;
`;

const MobileMenuContainer = styled.div`
  display: inline;
`;

const MenuContainer = styled.div<{ active: boolean; transparent: boolean; itemCount: number }>`
  > ul {
    display: flex;
    justify-content: center;
  }

  ${({ theme }) => theme.media.mobile} {
    height: ${({ active, itemCount }) => (active ? itemCount * 48 + 16 : '0')}px;
    background-color: ${({ transparent }) => (transparent ? 'transparent' : 'white')};
    transition: height 0.5s ease-in-out
      ${({ transparent }) => (transparent ? ', background-color 0.5s ease-in-out' : '')};

    position: absolute;
    overflow: hidden;
    left: 0;
    right: 0;
    top: 56px;

    > ul {
      opacity: ${({ active }) => (active ? 1 : 0)};
      height: ${({ itemCount }) => itemCount * 48 + 16}px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: opacity 0.5s ease-in-out;
    }
  }
`;

const NavItem = styled.li<{ transparent: boolean }>`
  cursor: pointer;
  margin: 0 12px;

  > a {
    text-decoration: none;
    font-size: 16px;
    font-weight: normal;
    line-height: 1.5;
    color: ${({ transparent }) => (transparent ? 'white' : 'black')};

    &.active {
      font-weight: bold;
    }
  }

  &:last-child {
    margin-right: 0px;
  }

  ${({ theme }) => theme.media.mobile} {
    margin: 0;
    position: relative;
    height: 48px;
    display: flex;
    align-items: center;
    overflow: hidden;

    a {
      padding: 0 16px;
      color: black;
      line-height: 48px;
      width: 100%;
      height: 100%;
      vertical-align: middle;

      &.active {
        background-color: ${({ theme }) => theme.color.grey200};
      }
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.4;
  background-color: ${({ theme }) => theme.color.black};
  z-index: 5;
`;

function blockTouchMove(e: Event) {
  e.preventDefault();
}

const NavBar: React.FC = () => {
  const router = useRouter();
  const isMobile = useContext(IsMobileContext);

  const [isTop, setIsTop] = useState(true);
  const [isHome, setIsHome] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsTop(global.pageYOffset === 0);
    window.addEventListener('scroll', () => {
      setIsTop(global.pageYOffset === 0);
    });
  }, []);

  useEffect(() => {
    setIsHome(router.pathname === '/');
  }, [router]);

  const routes = [
    {
      title: 'menu1',
      to: '/menu1',
      exact: false
    },
    {
      title: 'menu2',
      to: '/menu2',
      exact: false
    },
    {
      title: 'menu3',
      to: '/menu3',
      exact: false
    }
  ];

  function toggleMenu() {
    if (!isMobile) return;

    if (isMenuOpen) {
      window.removeEventListener('touchmove', blockTouchMove, false);
    } else {
      window.addEventListener('touchmove', blockTouchMove, { passive: false });
    }
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      {isMobile && isMenuOpen && <Overlay onClick={toggleMenu} />}
      <Nav transparent={!isMenuOpen && isTop && isHome} isHome={isHome}>
        <NavContainer>
          <Link href="/" passHref>
            <a
              href="/"
              rel="icon noreferrer"
              onClick={() => {
                if (isMenuOpen) toggleMenu();
              }}
            >
              <NavLogo src="/icon/logo.png" alt="Logo" width={80} height={24} />
            </a>
          </Link>

          {isMobile && (
            <MobileMenuContainer>
              <span onClick={toggleMenu} role="button" tabIndex={0} css={css({ outline: 'none' })}>
                <Icon
                  path={!isMenuOpen ? mdiMenu : mdiClose}
                  size={1}
                  color={!isMenuOpen && isTop && isHome ? 'white' : 'black'}
                />
              </span>
            </MobileMenuContainer>
          )}

          <MenuContainer
            active={isMenuOpen}
            transparent={!isMenuOpen && isTop && isHome}
            itemCount={routes.length}
          >
            <ul>
              {routes.map(({ to, title }) => (
                <NavItem
                  key={title}
                  transparent={!isMenuOpen && isTop && isHome}
                  onClick={toggleMenu}
                >
                  <ActiveLink href={to} passHref>
                    <a href={to} rel="noreferrer">
                      {title}
                    </a>
                  </ActiveLink>
                </NavItem>
              ))}
            </ul>
          </MenuContainer>
        </NavContainer>
      </Nav>
    </>
  );
};

export default NavBar;
