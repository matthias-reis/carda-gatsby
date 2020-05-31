import React from 'react';
import styled from '@emotion/styled';
import { InteractionApplause } from './interaction-applause';
import { InteractionComment } from './interaction-comment';
import { InteractionNewsletter } from './interaction-newsletter';
import { space, width } from '../style';

const InteractionsContainer = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: column;
  top: ${space[5]};
  left: calc(50% - 23rem);
  text-align: center;
`;

export const Interactions = () => (
  <InteractionsContainer>
    <InteractionNewsletter />
    <InteractionComment />
    <InteractionApplause />
  </InteractionsContainer>
);
