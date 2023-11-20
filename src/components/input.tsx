import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  type?: 'email' | 'text' | 'password';
  kind?: 'input'; // 추후에 input의 역할이 다양해질 것을 대비
  placeholder: string;
  register: UseFormRegisterReturn;
}

export default function Input({
  type = 'text',
  kind = 'input',
  placeholder,
  register,
  ...rest
}: InputProps) {
  switch (kind) {
    case 'input':
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
}
