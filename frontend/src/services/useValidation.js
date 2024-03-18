//useValidation.js

import { useState, useEffect } from 'react';
import { validateName, checkPhone, checkEmail, checkCPF } from '../services/ValidationService';

const useValidation = (formData) => {
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    cpf: '',
  });

  useEffect(() => {
    const nameError = validateName(formData.name);
    const phoneError = checkPhone(formData.phone);
    const emailError = checkEmail(formData.email);
    const cpfError = checkCPF(formData.cpf);

    setErrors({
      name: nameError || '',
      phone: phoneError || '',
      email: emailError || '',
      cpf: cpfError || '',
    });
  }, [formData]);

  return errors;
};

export default useValidation;