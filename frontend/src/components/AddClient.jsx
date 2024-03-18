// AddClient.jsx

import React, { useState } from 'react';
import { addClient } from '../Api';
import ClientForm from './ClientForm';
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ErrorMessage = styled.span`
  color: red;
`;

const AddClient = () => {
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      await addClient(formData);
    } catch (error) {
      setError('Erro ao adicionar cliente. Por favor, tente novamente.');
    }
  };

  return (
    <PageContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ClientForm formType="Novo usuário" formDescription="Informe os campos a seguir para criar um novo usuário:" btnText="Criar" onSubmit={handleSubmit} />
    </PageContainer>
  );
};

export default AddClient;