// ClientList.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchClients, deleteClient } from '../Api'; 
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const ClientUl = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const ClientItem = styled.li`
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 30% 30% 20% 14%;
  grid-column-gap: 10px;
`;

const ClientInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClientDetails = styled.div`
  font-size: 0.9em;
  color: #777;
`;

const StatusDetails = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  color: #777;
`;

const ClientActions = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  color: ${props => props.color};
  background-color: ${props => props.background};
  border: 2px solid ${props => props.border};
  border-radius: 3px;
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${props => props.hoverBackground};
    color: ${props => props.hoverColor};
    border-color: ${props => props.hoverBorder};
  }
`;

const EditButton = styled(ActionButton)`
  width: 100%;
  margin: 5px;

  &:hover {
    background-color: orange;
    color: white;
    border-color: orange;
  }
`;

const DeleteButton = styled(ActionButton)`
  width: 100%;
  margin: 5px;

  &:hover {
    background-color: red;
    color: white;
    border-color: red;
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  border-top: 1px solid #ccc;
  padding: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Text = styled.span`
  font-size: 0.8em;
`;

const Button = styled.button`
  background-color: white;
  color: orange;
  border: 2px solid orange;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 50px;
  width: 200px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: orange;
    color: white;
    border-color: orange;
  }
`;

const StatusCircle = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 10px;
  background-color: ${props => {
    switch (props.status) {
      case 'Ativo':
        return 'green';
      case 'Inativo':
        return 'red';
      case 'Aguardando ativação':
        return 'orange';
      case 'Desativado':
        return 'gray';
      default:
        return 'black';
    }
  }};
  border-radius: 50%;
`;

function ClientList() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClientsData();
  }, []);

  const fetchClientsData = async () => {
    try {
      const clientsData = await fetchClients();
      setClients(clientsData);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      setError('Erro ao buscar clientes. Por favor, tente novamente.');
    }
  };

  const handleEditClient = async (id) => {
    try {
      await navigate(`/edit/${id}`);
    } catch (error) {
      console.error('Erro ao editar cliente: ', error);
      setError('Erro ao editar cliente. Por favor, tente novamente.');
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await deleteClient(id);
      fetchClientsData();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      setError('Erro ao excluir cliente. Por favor, tente novamente.');
    }
  };

  return (
    <>
      <TopContainer>
        <TextContainer>
          <Text>Listagem de usuários</Text>
          <Text>Escolha um cliente para visualizar os detalhes</Text>
        </TextContainer>
        <div><Link to="/add"><Button>Novo Cliente</Button></Link></div>
      </TopContainer>
      <ClientUl>
        {error && <Text>{error}</Text>}
        {clients.map((item, i) => (
          <ClientItem key={i}>
            <ClientInfo>
              <ClientDetails>
                <strong>{item.name}</strong>
              </ClientDetails>
              <ClientDetails>
                {item.email}
              </ClientDetails>
            </ClientInfo>
            <ClientInfo>
              <ClientDetails>
                <strong>{item.cpf}</strong>
              </ClientDetails>
              <ClientDetails>
                {item.phone}
              </ClientDetails>
            </ClientInfo>
            <StatusDetails>
              <StatusCircle status={item.status} />
              {item.status}
            </StatusDetails>
            <ClientActions>
              <EditButton
                onClick={() => handleEditClient(item.id)}
                color="orange"
                background="white"
                border="orange"
              >
                Editar
              </EditButton>
              <DeleteButton
                onClick={() => handleDeleteClient(item.id)}
                color="red"
                background="white"
                border="red"
              >
                Excluir
              </DeleteButton>
            </ClientActions>
          </ClientItem>
        ))}
      </ClientUl>
    </>
  );
}

export default ClientList;
