import Utils from '@/utils';

interface ButtonProps {
  children: React.ReactNode;
  className: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  children,
  disabled,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={Utils.combineClassNames(
        'rounded-lg bg-dark-background-main font-semibold text-dark-text-main dark:bg-light-background-main dark:text-light-text-main',
        className,
      )}
    >
      {children}
    </button>
  );
}
