import clsx from 'clsx';

interface LoadingProps {
  className?: string;
}

export default function Loading({ className }: LoadingProps) {
  return (
    <span
      className={clsx(
        'animate-loading relative mx-auto my-4 box-border block h-12 w-12 rounded-full text-white',
        className,
      )}
    />
  );
}
