import styled from '@emotion/styled';
import { space, width } from '../style';

export const Container = styled.div`
  position: relative;
  padding: 0 ${space[1]};
  margin: 0 auto;
  max-width: ${({ large }) => (large ? width[5] : width[4])};
`;
