import * as React from 'react';
import styled from '@emotion/styled';
import logo from './logo.png';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return <Img src={logo} alt="Cardamonchai Logo" />;
}

const Img = styled.img`
  width: 80px;
  heiht: 80px;
`;
