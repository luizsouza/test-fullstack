//App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientList from './components/ClientList';
import AddClient from './components/AddClient';
import EditClient from './components/EditClient';
import GlobalStyle from '../src/styles/Global';
import styled from "styled-components";
import { FiUser } from "react-icons/fi";
import Header from './components/Header';

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 400px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center; /* Alinhe o ícone e o texto verticalmente */
  margin-top: 70px;
  justify-content: flex-start; /* Alinhe o conteúdo à esquerda */
  width: 80%;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-left: 10px; /* Adicione um espaço à esquerda do texto */
`;

const Icon = styled(FiUser)`
  font-size: 24px; /* Tamanho do ícone */
  color: #555; /* Cor do ícone */
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <Router>
     <Header src="https://gkpb.com.br/wp-content/uploads/2021/04/novo-logo-uol-2021-fundo-preto.jpg" />
      <PageContainer>
       <TitleContainer>
         <Icon />
         <Title>Painel de clientes</Title>
        </TitleContainer>
       <Container>
        <Routes>
          <Route path="/" element={<ClientList />} />
          <Route path="/add" element={<AddClient />} />
          <Route path="/edit/:id" element={<EditClient />} />
        </Routes>
        </Container>
       <GlobalStyle />
     </PageContainer>
    </Router>
  );
}

export default App;
