import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { color, space, fontSize } from '../style';
import { getPath } from '../gatsby/slugify';

export const LabelList: React.FC<{ labels: string[] }> = ({ labels }) => {
  const normalisedLabels = Array.from(new Set(labels));
  return (
    <StyledList>
      {normalisedLabels.map((label: string) => {
        const destination = getPath(label);
        return (
          <StyledLabel key={label} to={destination}>
            {label}
          </StyledLabel>
        );
      })}
    </StyledList>
  );
};

const StyledList = styled.nav`
  margin-bottom: ${space[3]};
`;

const StyledLabel = styled(Link)`
  display: inline-block;
  border: 1px solid ${color.border20};
  background: ${color.overlay10};
  color: ${color.text30};
  border-radius: ${space[1]};
  padding: 0 ${space[2]};
  margin: 0 ${space[1]} ${space[1]} 0;
  font-size: ${fontSize[2]};
  text-decoration: none;
  text-transform: lowercase;

  &:hover {
    background: ${color.overlay40};
    color: ${color.text50};
  }
`;
