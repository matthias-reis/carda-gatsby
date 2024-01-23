import { Label } from '@radix-ui/react-label';
import { FC, ReactNode } from 'react';

export const Field: FC<{ label: string; children: ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <div className="grid grid-cols-form gap-2">
      <Label htmlFor={label}>{label}</Label>
      <div>{children}</div>
    </div>
  );
};
