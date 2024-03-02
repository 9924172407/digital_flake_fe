import React, { ChangeEvent } from 'react';
import bottomArrow from '../../assets/bottomArrow.png';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect: React.FC<SelectProps> = ({ name, label, options, onChange, value }) => {
  return (
    <div className="flex relative m-5 w-full">
      <label htmlFor={name} className="text-gray-600 absolute -top-3 left-2 bg-white">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="border appearance-none border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
        value={value}
        onChange={onChange}
      >
        {options?.map((opt: Option, index: number) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <img src={bottomArrow} className='h-2 w-auto' alt="arrow" />
      </div>
    </div>
  );
};

export default CustomSelect;
