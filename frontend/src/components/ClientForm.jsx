//ClientForm.jsx

import React, { useState, useEffect } from 'react';
import { validateName, checkPhone, checkEmail, checkCPF, checkStatus, checkData } from '../services/ValidationService';
import { mask, unMask } from 'remask';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: wrap;
  padding: 20px;
  width: 100%;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 200px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  margin-right: 10px;
`;

const Button = styled.button`
  flex: 1;
  background-color: white;
  color: orange;
  border: 2px solid orange;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: orange;
    color: white;
    border-color: orange;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 230px;
  gap: 10px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid #ccc;
  padding: 10px;
  margin-top: 0px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Text = styled.span`
  font-size: $0.8em;
`;

const Select = styled.select`
  width: 220px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  background-color: white;
  margin-right: 10px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  cpf: '',
  status: '', // Adicione o campo status ao initialFormData
};

const ClientForm = ({ initialData, onSubmit, formType, formDescription, btnText }) => {
  const [formData, setFormData] = useState(initialData || initialFormData);
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    cpf: '',
    status: '', // Adicione o campo status ao estado errors
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const nameError = validateName(formData.name);
    const phoneError = checkPhone(formData.phone);
    const emailError = checkEmail(formData.email);
    const cpfError = checkCPF(formData.cpf);
    const statusError = checkStatus(formData.status);

    setErrors({
      name: nameError || '',
      phone: phoneError || '',
      email: emailError || '',
      cpf: cpfError || '',
      status: statusError || '', // Adicione o campo status ao estado errors
    });
  }, [formData, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let maskedValue = value;

    if (name === 'phone') {
      const originalValue = unMask(value, ['(99) 9999-9999', '(99) 99999-9999']);
      maskedValue = mask(originalValue, ['(99) 9999-9999', '(99) 99999-9999']);
    }

    if (name === 'cpf') {
      const originalValue = unMask(value, ['999.999.999-99']);
      maskedValue = mask(originalValue, ['999.999.999-99']);
    }

    const error = checkData(name, maskedValue);

    setFormData({
      ...formData,
      [name]: maskedValue,
    });

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, email, cpf, status } = formData;

    const nameError = validateName(name);
    const phoneError = checkPhone(phone);
    const emailError = checkEmail(email);
    const cpfError = checkCPF(cpf);

    if (nameError || phoneError || emailError || cpfError || !status) {
      setErrors({
        name: nameError || '',
        phone: phoneError || '',
        email: emailError || '',
        cpf: cpfError || '',
        status: '', // Adicione o campo status ao estado errors
      });
      setMessage('Por favor, preencha os campos corretamente.');
      return;
    }

    try {
      await onSubmit(formData);
      setMessage('Cliente adicionado/atualizado com sucesso!');
      setFormData(initialFormData);
    } catch (error) {
      setMessage('Erro ao adicionar/atualizar cliente.');
    }
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer>
      <TopContainer>
        <TextContainer>
          <Text>{formType}</Text>
          <Text>{formDescription}</Text> 
          {message && <Text>{message}</Text>}
        </TextContainer>
      </TopContainer>
      <FormContainer onSubmit={handleSubmit}>
        <InputArea>
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
          />
          {!errors.name ? (
            <span style={{ color: 'green', margin: '10px' }}>✓</span>
          ) : (
            <span style={{ color: 'red', margin: '10px'  }}>✕</span>
          )}
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </InputArea>
        <InputArea>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
          />
          {!errors.email ? (
            <span style={{ color: 'green', margin: '10px'  }}>✓</span>
          ) : (
            <span style={{ color: 'red', margin: '10px'  }}>✕</span>
          )}          
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </InputArea>
        <InputArea>
          <Input
            mask="999.999.999-99"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="CPF"
          />
          {!errors.cpf ? (
            <span style={{ color: 'green', margin: '10px'  }}>✓</span>
          ) : (
            <span style={{ color: 'red', margin: '10px'  }}>✕</span>
          )}          
          {errors.cpf && <span style={{ color: 'red' }}>{errors.cpf}</span>}
        </InputArea>    
        <InputArea>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Telefone"
          />
          {!errors.phone ? (
            <span style={{ color: 'green', margin: '10px'  }}>✓</span>
          ) : (
            <span style={{ color: 'red', margin: '10px'  }}>✕</span>
          )}
          {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
        </InputArea>
        <InputArea>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="" disabled hidden>Status</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Aguardando ativação">Aguardando ativação</option>
            <option value="Desativado">Desativado</option>            
          </Select>
          {!errors.status ? (
            <span style={{ color: 'green', margin: '10px'  }}>✓</span>
          ) : (
            <span style={{ color: 'red', margin: '10px'  }}>✕</span>
          )}
          {errors.status && <span style={{ color: 'red' }}>{errors.status}</span>}
        </InputArea>
        <ButtonContainer>
          <Button type="submit">{btnText}</Button>
          <Button onClick={handleGoBack}>Voltar</Button>            
        </ButtonContainer>
      </FormContainer>
    </PageContainer>
  );
};

export default ClientForm;
