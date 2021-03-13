import styled from '@emotion/styled';
import { space, color } from '../style';

export const HeaderSheet = styled.div<{
  isVisible: boolean;
  heightInVh: number;
}>`
  position: absolute;
  top: 4rem;
  left: 0;
  height: ${(props) => (props.isVisible ? `auto` : '0')};
  width: 100%;
  background: ${color.background10};
  z-index: 10;
  box-shadow: 0 17px 30px -25px ${color.shadow};
  border-bottom: 2px solid ${color.border10};
  overflow: hidden;
`;
