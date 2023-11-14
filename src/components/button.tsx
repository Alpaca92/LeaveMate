import Utils from '@/utils';

interface ButtonProps {
  disabled: boolean;
  text: string;
  className: string;
}

export default function Button({ disabled, text, className }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={Utils.combineClassNames(
        'rounded-lg bg-light-text-main font-semibold text-dark-text-main dark:bg-dark-text-main dark:text-light-text-main',
        className,
      )}
    >
      {disabled ? 'Loading...' : text}
    </button>
  );
}
