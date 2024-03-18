// Header.jsx

import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  height: 120px;
  width: 100%;
  background-color: black; /* Cor de fundo do header */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  height: 120px; /* Altura da imagem */
  width: auto; /* Largura será ajustada automaticamente */
`;

const Header = ({ src }) => {
  return (
    <HeaderContainer>
      <Logo src={src} alt="Logo" />
    </HeaderContainer>
  );
};

export default Header;