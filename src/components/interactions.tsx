import * as React from 'react';
import styled from '@emotion/styled';
import { InteractionApplause } from './interaction-applause';
import { InteractionComment } from './interaction-comment';
import { InteractionNewsletter } from './interaction-newsletter';
import { color, space } from '../style';
import { Article } from '../types';

type InteractionsProps = {
  meta: Article;
};

export const Interactions: React.FC<InteractionsProps> = ({ meta }) => (
  <InteractionsContainer>
    <InteractionNewsletter />
    <InteractionComment />
    <InteractionApplause meta={meta} />
  </InteractionsContainer>
);

const InteractionsContainer = styled.nav`
  position: fixed;
  align-items: center;
  flex-direction: column;
  top: ${space[5]};
  left: 0;
  text-align: center;
  padding: ${space[1]};
  background: ${color.green05};
  border-radius: 0 ${space[2]} ${space[2]} 0;
  border: 3px solid ${color.border10};
  border-left: 0;
  box-shadow: 0 15px 20px ${color.shadow};
  z-index: 1;

  @media (max-width: 959px) {
    top: auto;
    bottom: ${space[3]};
  }
`;
