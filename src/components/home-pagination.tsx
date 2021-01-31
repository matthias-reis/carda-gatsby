import * as React from 'react';
import styled from '@emotion/styled';

const LodingTrigger = styled.div`
  position: relative;
  top: -80vh;
`;

type HomePaginationProps = {
  onShouldLoad: () => void;
  isLoading: boolean;
};

export const HomePagination: React.FC<HomePaginationProps> = ({
  onShouldLoad,
  isLoading = false,
}) => {
  const observer = new IntersectionObserver((intersections) => {
    if (intersections[0].isIntersecting && !isLoading) {
      onShouldLoad();
    }
  });

  const closingEl = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (closingEl.current !== null) {
      observer.observe(closingEl.current);
    }
    return () => {
      if (closingEl.current !== null) {
        observer.unobserve(closingEl.current);
      }
    };
  }, [closingEl]);

  return (
    <div>
      <LodingTrigger ref={closingEl} />
      <span>The End</span>
    </div>
  );
};
