// EditClient.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchClient, editClient } from '../Api';
import ClientForm from './ClientForm';
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const EditClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedClient = await fetchClient(id);
        setClient(fetchedClient);
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (formData) => {
    await editClient(id, formData);
  };

  return (
    <PageContainer>
      {client ? (
        <>
          <ClientForm formType="Edição de usuário" formDescription="Edite os campos a seguir do usuário selecionado:" btnText="Salvar" initialData={client} onSubmit={handleSubmit} />
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </PageContainer>
  );
};

export default EditClient;
