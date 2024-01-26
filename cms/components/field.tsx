import { Label } from '@/components/ui/label';
import { FC, ReactNode } from 'react';

export const Field: FC<{ label: string; children: ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <div className="grid grid-cols-form gap-2">
      <Label htmlFor={label} className="text-stone-400 text-right">
        {label}
      </Label>
      <div>{children}</div>
    </div>
  );
};
