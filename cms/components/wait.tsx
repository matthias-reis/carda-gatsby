import { FC } from 'react';

export const Wait: FC = () => {
  return (
    <div className="grid place-content-center h-full">
      <LoadingSpinner />
    </div>
  );
};

const LoadingSpinner = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="80px"
    height="80px"
    className="text-stone-700"
  >
    <style>
      {
        '@keyframes spinner_qtyZ{0%{r:0}25%{r:3px;cx:4px}50%{r:3px;cx:12px}75%{r:3px;cx:20px}to{r:0;cx:20px}}.spinner_nOfF{animation:spinner_qtyZ 2s cubic-bezier(.36,.6,.31,1) infinite}'
      }
    </style>
    <circle fill="currentColor" cx={4} cy={12} r={3} className="spinner_nOfF" />
    <circle
      fill="currentColor"
      cx={4}
      cy={12}
      r={3}
      className="spinner_nOfF"
      style={{
        animationDelay: '-.5s',
      }}
    />
    <circle
      fill="currentColor"
      cx={4}
      cy={12}
      r={3}
      className="spinner_nOfF"
      style={{
        animationDelay: '-1s',
      }}
    />
    <circle
      fill="currentColor"
      cx={4}
      cy={12}
      r={3}
      className="spinner_nOfF"
      style={{
        animationDelay: '-1.5s',
      }}
    />
  </svg>
);
