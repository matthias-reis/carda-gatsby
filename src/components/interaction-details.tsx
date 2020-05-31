import * as React from 'react';
import styled from '@emotion/styled';
import { Container } from './container';
import { color } from '../style';

const Section = styled.aside`
  background: ${color.cold[3]};
`;

export const InteractionDetails: React.FC = () => (
  <Section>
    <Container large>
      <h2>Kommentar hinterlassen</h2>
      <form>
        <div>
          <label htmlFor="comment">Dein Beitrag</label>
          <textarea id="comment" name="comment">
            Bla
          </textarea>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" name="email" />
        </div>
      </form>
      <h2>
        Bisherige Kommentare <span>2</span>
      </h2>
      <ul>
        <li>
          <p>
            Mickey Mouse <span>vor 2 Wochen</span>
          </p>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
          <div>
            <a href="">antworten</a>
          </div>
          <ul>
            <li>
              <p>
                Anne <span>vor 2 Wochen</span>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod.
              </p>
              <div>
                <a href="">antworten</a>
              </div>
            </li>
          </ul>
        </li>
        <li>
          <p>
            Donald Duck <span>vor 3 Wochen</span>
          </p>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
          <div>
            <a href="">antworten</a>
          </div>
        </li>
      </ul>
    </Container>
  </Section>
);
