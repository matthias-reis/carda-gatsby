import * as React from "react";
import styled from "@emotion/styled";

export const HeaderSheet = styled.div<{
  isVisible: boolean;
  heightInVh: number;
}>`
  position: absolute;
  top: 4rem;
  left: 0;
  max-height: ${(props) => (props.isVisible ? `${props.heightInVh}vh` : "0")};
  transition: ${(props) =>
    props.isVisible ? "max-height 0.3s ease-in" : "max-height 0.15s ease-out"};
  overflow: hidden;
  width: 100%;
  background: #fff;
  z-index: 1;
  box-shadow: 0 13px 30px -13px #0004;
`;
