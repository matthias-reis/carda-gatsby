import * as React from "react";
import styled from "@emotion/styled";

import { color } from "../style";

const Button = styled.button`
  border: none;
  background: none;
  color: ${color.neutral[3]};

  &:focus {
    outline: none;
    border: none;
    color: ${color.warm[1]};
  }

  &:hover {
    color: ${color.neutral[1]};
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
