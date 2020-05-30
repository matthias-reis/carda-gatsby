import * as React from 'react';
import styled from '@emotion/styled';
import { color } from '../style';

const UnstyledHR = (props) => {
  return (
    <svg viewBox="0 0 500 24" {...props}>
      <g fill="none" fillRule="evenodd" stroke="currentColor">
        <path d="M0 12.5h500M250.5 12L234 4v16l33-16v16z" />
        <path d="M283 4l-65 16V4l65 16zM234 8.5H25M25 16.5h209M267 16.5h208M475 8.5H267" />
      </g>
    </svg>
  );
};

export const HR = styled.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #0000 0%, #0008 50%, #0000 100%);
`;
