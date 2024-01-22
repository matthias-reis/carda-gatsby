import { Logo } from '@/components/logo';
import { FC } from 'react';

export const SplashPanel: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Logo width={96} height={96} />
      <div className="text-stone-700 text-6xl font-bold font-condensed">
        Anne CMS
      </div>
      <div className="text-stone-500 font-condensed">
        Sounds Vegan Content Management
      </div>
    </div>
  );
};
