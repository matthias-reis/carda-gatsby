import * as React from 'react';
import styled from '@emotion/styled';

type HomePaginationProps = {
  onShouldLoad: () => void;
  isLoading: boolean;
};

export const HomePagination: React.FC<HomePaginationProps> = ({
  onShouldLoad,
  isLoading = false,
}) => {
  const observer = React.useRef<IntersectionObserver>();

  const closingEl = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!observer.current) {
      observer.current = new IntersectionObserver((intersections) => {
        if (intersections[0].isIntersecting && !isLoading) {
          onShouldLoad();
        }
      });
    }

    if (closingEl.current !== null) {
      observer.current.observe(closingEl.current);
    }
    return () => {
      if (closingEl.current !== null) {
        observer.current?.unobserve(closingEl.current);
      }
    };
  }, [closingEl, onShouldLoad, observer]);

  return (
    <div>
      <LodingTrigger ref={closingEl} />
      <span>The End</span>
    </div>
  );
};

const LodingTrigger = styled.div`
  position: relative;
  top: -80vh;
`;
