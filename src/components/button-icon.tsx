import * as React from 'react';
import styled from '@emotion/styled';

import { color } from '../style';

const Button = styled.button`
  border: none;
  background: none;
  color: ${color.text30};

  &:focus {
    outline: none;
    border: none;
    color: ${color.highlight50};
  }

  &:hover {
    color: ${color.text20};
  }
`;

export const IconButton: React.FC<
  { Icon: React.FC } & React.ButtonHTMLAttributes<unknown>
> = ({ Icon, ...props }) => {
  return (
    <Button {...props}>
      <Icon />
    </Button>
  );
};
