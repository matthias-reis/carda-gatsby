import * as React from "react";
import styled from "@emotion/styled";

import { SearchIcon } from "./search-icon";

import { color, space, font, fontSize } from "../style";

const Wrapper = styled.header`
  box-shadow: 0 13px 30px -25px #0004;
  height: 4rem;
  margin: 0 ${space[1]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button``;

const Icon = styled(SearchIcon)`
  margin-top: 0.5rem;
`;

export const Search: React.FC = () => {
  const handleToggle = () => {
    console.log("toggling search");
  };
  return (
    <Button onClick={handleToggle}>
      <Icon />
    </Button>
  );
};
