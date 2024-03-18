//ValidationService.js

import { validateEmail, } from 'validations-br';
import { unMask } from 'remask';

export const validateName = (name) => {
    if (!name.trim()) {
      return 'Por favor, insira um nome válido.';
    }
    return '';
  };
  
  export const checkPhone = (phone) => {
    const unMaskedValue =  unMask(phone);
    if (unMaskedValue.length === 10 || unMaskedValue.length === 11) {
      return '';
    } else {
      return 'O número de telefone é inválido';
    }
  };

  export const checkEmail = (email) => {
    if (!validateEmail(email)) {
      return 'O e-mail é inválido.';
    }
    return '';
  };
  
  export const checkCPF = (cpf) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Expressão regular para a máscara de CPF
    if (!cpfRegex.test(cpf)) {
      return 'O CPF é inválido.';
    }
    return '';
  };
  
  export const checkStatus = (status) => {
    if (status === 'Ativo' || status === 'Inativo' || status === 'Aguardando ativação' || status === 'Desativado') {
      return '';
    } else {
      return 'O Status é inválido';
    }
  }

  export const checkData = (name, value) => {
    switch (name) {
      case 'name':
        return validateName(value);
      case 'phone':
        return checkPhone(value);
      case 'email':
        return checkEmail(value);
      case 'cpf':
        return checkCPF(value);
      case 'status':
        return checkStatus(value);
      default:
        return '';
    }
  };
  