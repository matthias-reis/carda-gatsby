import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { color, space, fontSize } from '../style';
import { getPath } from '../gatsby/slugify';

const labelTypes = {
  category: 'Thema',
  serie: 'Serie',
  archive: 'Archiv',
};

export const LabelList: React.FC<{
  labels: { title: string; slug: string; type: string }[];
}> = ({ labels }) => {
  return (
    <StyledList>
      {labels.map((label) => {
        const destination = getPath(label.slug);
        return (
          <StyledLabel key={label.slug} to={destination}>
            <small>
              {label.type !== 'tag' && `${labelTypes[label.type]}: `}
            </small>
            {label.title}
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

  &:hover {
    background: ${color.overlay40};
    color: ${color.text50};
  }
`;
