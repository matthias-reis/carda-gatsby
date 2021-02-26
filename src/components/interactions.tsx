import * as React from 'react';
import styled from '@emotion/styled';
import { InteractionApplause } from './interaction-applause';
import { InteractionComment } from './interaction-comment';
import { InteractionNewsletter } from './interaction-newsletter';
import { space } from '../style';
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
  display: flex;
  align-items: center;
  flex-direction: column;
  top: ${space[5]};
  left: calc(50% - 23rem);
  text-align: center;
`;
