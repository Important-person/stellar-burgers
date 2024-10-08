import { useState } from 'react';
import React from 'react';

export function useForm<T extends { [key: string]: string }>(inputValues: T) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
