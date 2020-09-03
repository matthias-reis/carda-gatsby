import * as React from "react";
import styled from "@emotion/styled";
import { DiscussionEmbed } from "disqus-react";
import { Container } from "./container";
import { color } from "../style";
import type { Article } from "../types";

const Section = styled.aside`
  background: ${color.cold[3]};
`;

const Comments: React.FC<{ meta: Article }> = ({ meta }) => (
  <DiscussionEmbed
    shortname="example"
    config={{
      url: `https://cardamonchai.com${meta.path}`,
      identifier: `https://cardamonchai.com${meta.path}`,
      title: meta.title,
      language: "de",
    }}
  />
);
const Loading: React.FC = () => <h1>...</h1>;

export const InteractionDetails: React.FC<{ meta: Article }> = ({ meta }) => {
  const [isComponentMounted, setIsComponentMounted] = React.useState(false);
  React.useEffect(() => setIsComponentMounted(true), []);
  return (
    <Section>
      <Container large>
        <h2>Kommentar hinterlassen</h2>
        {isComponentMounted ? <Comments meta={meta} /> : <Loading />}
      </Container>
    </Section>
  );
};
