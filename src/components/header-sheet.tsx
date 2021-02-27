import styled from '@emotion/styled';
import { space } from '../style';

export const HeaderSheet = styled.div<{
  isVisible: boolean;
  heightInVh: number;
}>`
  position: absolute;
  top: 4rem;
  left: 0;
  height: ${(props) => (props.isVisible ? `auto` : '0')};
  width: 100%;
  background: #fff;
  z-index: 10;
  box-shadow: 0 13px 30px -13px #0004;
  overflow: hidden;
`;
