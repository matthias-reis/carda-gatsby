import * as React from "react";
import styled from "@emotion/styled";

import { IconSearch } from "./icons";
import { IconButton } from "./button-icon";
import { HeaderSheet } from "./header-sheet";

import { color, space, width, fontSize, font } from "../style";

const Wrapper = styled.header`
  box-shadow: 0 13px 30px -25px #0004;
  height: 4rem;
  margin: 0 ${space[1]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Form = styled.form`
  display: flex;
  margin: 0 auto;
  width: ${width[3]};
  max-width: 100%;
  justify-content: space-between;
  margin-bottom: ${space[1]};
`;

const Field = styled.input`
  flex: 1 1 auto;
  width: ${width[3]};
  margin-right: ${space[1]};
  border: 1px solid ${color.border[1]};
  border-radius: ${space[0]};
  height: 1.75rem;
  line-height: 1.75rem;
  font-size: ${fontSize[4]};
  font-family: ${font.body};
  color: ${color.neutral[2]};

  &:focus {
    border-color: ${color.warm[1]};
    outline: none;
  }
`;

const Submit = styled.button`
  flex: 0 0 auto;
  border: 1px solid ${color.border[0]};
  border-radius: ${space[0]};
  background: ${color.neutral[4]};
  color: #fff;

  &:focus,
  &:hover {
    border-color: ${color.warm[1]};
    background: ${color.warm[2]};
    outline: none;
  }
`;

export const Search: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log(inputRef.current?.value);
    setIsVisible(false);
  };
  return (
    <React.Fragment>
      <IconButton onClick={handleToggle} Icon={IconSearch} />
      <HeaderSheet isVisible={isVisible} heightInVh={15}>
        <Form onSubmit={handleSubmit}>
          <Field type="search" ref={inputRef} />
          <Submit type="submit">Suchen</Submit>
        </Form>
      </HeaderSheet>
    </React.Fragment>
  );
};
