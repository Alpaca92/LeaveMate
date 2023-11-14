import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  type?: 'email' | 'text' | 'password';
  placeholder: string;
  register: UseFormRegisterReturn;
}

export default function Input({
  type = 'text',
  placeholder,
  register,
  ...rest
}: InputProps) {
  return (
    <input
      className="rounded-lg px-3 py-2 focus:outline-none"
      type={type}
      placeholder={placeholder}
      {...register}
      {...rest}
    />
  );
}
