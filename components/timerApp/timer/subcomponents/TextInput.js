import React from 'react';
import { useFormContext } from 'react-hook-form';

const TextInput = ({ name, label }) => {
  const { register, watch } = useFormContext();

  return (
    <div className="pt-2">
      <div className="ml-3 text-xs text-furniture">{label}</div>
      <input
        type="text"
        {...register(name)}
        className="ml-2 pl-2 w-[175px] h-8 rounded-md  baseCell"
      />
    </div>
  );
};

export default TextInput;
