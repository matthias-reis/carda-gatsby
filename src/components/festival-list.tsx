import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { color, font, fontSize } from '../style';

export const FestivalList: React.FC<{ link?: string }> = ({ link }) => {
  const withOriginalLink = !!link;
  const linkProps = withOriginalLink
    ? { as: 'a', href: link }
    : { to: '/2015/03/die-ultimative-vegane-festivalliste' };
  return (
    <div>
      <MyLink {...linkProps}>
        <Tent />
        <Text>
          <Title>
            {withOriginalLink ? (
              <>
                Die <strong>ultimative vegane Festivalliste</strong>
              </>
            ) : (
              <>
                Hier geht's zur{' '}
                <strong>ultimativen veganen Festivalliste</strong>
              </>
            )}
          </Title>
          <Tagline>
            {withOriginalLink
              ? 'Jetzt herunterladen!'
              : 'Mit Gratis-Download zum Ausdrucken!'}
          </Tagline>
        </Text>
      </MyLink>
    </div>
  );
};

function Tent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={39}
      viewBox="0 0 1280 822"
      {...props}
    >
      <path
        fill="#fff"
        d="M616 1.5C510.5 14.6 404 109.1 291.3 290 270 324.2 259.8 341.9 172 498.5 127.3 578.2 80.8 661.3 68.6 683l-22.1 39.4-.5-12.9-.5-13-22.8-.3L0 696v126h46v-25.6l117.1-204.5c64.4-112.4 117.8-205.1 118.7-206 .9-.9 63.8-40 139.7-86.9 75.9-46.9 149-92.3 162.4-100.8 36.1-22.8 39.3-24.2 55.7-24.2 15.8 0 19.2 1.3 45.9 18 7.7 4.8 80.8 50 162.5 100.5s149.3 92.5 150.2 93.4c.9.9 37.1 63.5 80.4 139.1 43.3 75.6 96 167.6 117.1 204.4l38.3 67V822h46V695l-22.7.2-22.8.3-.5 13.5-.5 13.4-47.6-84.4C984 279.8 998.3 304.7 963.5 252c-40.5-61.4-77.3-107.8-117.2-147.7C768.7 26.9 691-7.8 616 1.5z"
      />
      <path
        fill="#fff8"
        d="M395.1 354c-52.3 32-81.9 50.6-82.7 52.1-1 2.1-25.7 58.3-84.4 192.9-9.2 21.2-32.6 74.6-51.9 118.8-19.3 44.2-35.1 80.6-35.1 80.8 0 .2 224.5.4 499 .4s499-.2 499-.4-15.8-36.6-35.1-80.8c-19.3-44.2-42.7-97.6-51.9-118.8-9.2-21.2-29.5-67.5-45-103s-30.8-70.5-34-77.9c-3.3-7.4-6.3-13.7-6.7-14.1-.9-.9-162.1-100-162.6-100-.1 0 4.6 46.5 10.4 103.2 24.9 240.8 23.1 222 21.9 229-3.4 18.6-18.4 34.5-35.9 37.8-7.9 1.5-311.2 1.4-318.3-.1-13.6-2.9-25.2-12.3-31.5-25.5-3.4-7.1-3.8-8.8-4.1-17.4-.2-6.9 3.9-51.5 15.2-165 8.5-85.5 15.7-157 16-158.8.3-1.7.2-3.2-.2-3.1-.4 0-37.3 22.5-82.1 49.9z"
      />
    </svg>
  );
}

const MyLink = styled(Link)`
  display: flex;
  align-items: center;
  background: ${color.green10};
  border-radius: 10px;
  text-decoration: none;
  padding: 1rem 1rem 1rem 1.5rem;
  &:hover {
    box-shadow: 0 0 30px #fff8;
  }
`;

const Title = styled.span`
  display: block;
  color: #fff;
  text-decoration: none;
  font-size: ${fontSize[4]};
`;
const Tagline = styled.span`
  display: block;
  color: #fff8;
  text-decoration: none;
  font-size: ${fontSize[2]};
`;
const Text = styled.span`
  margin-left: 1rem;
`;
