import * as React from 'react';
import styled from '@emotion/styled';
import { color, fontSize, space } from '../style';
import { IconApplause } from './icons';
import { Article } from '../types';
import { hashCode } from '../hash-code';
import { event } from './analytics';

const LS_KEY = 'crdpls';
const BASE_URL = 'https://europe-west1-cardamonchai-220814.cloudfunctions.net';

type StorageState = Record<string, number>;

let storageState: StorageState = {};

let supportsLs = 'localStorage' in globalThis;

// look into local storage and find entry with user id and data
const initApplause = () => {
  if (supportsLs) {
    try {
      const lsContent = readFromLS();
      if (lsContent) {
        storageState = lsContent;
      }
    } catch (e) {
      supportsLs = false;
    }
  }
};

const incrementPage = (pageId: string, count: number) => {
  storageState[pageId] = (storageState[pageId] || 0) + count;
  saveToLS(storageState);
};

const saveToLS = (data: StorageState) => {
  globalThis.localStorage.setItem(LS_KEY, JSON.stringify(data));
};

const readFromLS: () => StorageState | null = () => {
  const res = globalThis.localStorage.getItem(LS_KEY);
  if (res) {
    return JSON.parse(res);
  } else {
    return null;
  }
};

const encode = (payload: object) => {
  return globalThis.btoa(
    JSON.stringify({ verify: hashCode(navigator.userAgent), payload })
  );
};

initApplause();

type InteractionsProps = {
  meta: Article;
};

export const InteractionApplause: React.FC<InteractionsProps> = ({ meta }) => {
  const pageId = meta.fields.path;

  // own applause initially loaded from local storage
  const [userCount, setUserCount] = React.useState(storageState[pageId] || 0);

  // overall count coming async from the database
  const [allCount, setAllCount] = React.useState(0);

  // running a one second debounce timeout
  const timeoutId = React.useRef<number>();

  // ... and count the claps inbetween
  const debouncedApplauseCount = React.useRef<number>();

  // ... and count the silent (automatic) claps inbetween
  const debouncedSilentApplauseCount = React.useRef<number>();

  // gets the count data from remote and applies it
  React.useEffect(() => {
    (async () => {
      const payload = {
        pageId,
      };
      const res = await globalThis.fetch(
        `${BASE_URL}/getApplause?d=${encode(payload)}`
      );
      const { silentApplause, activeApplause } = await res.json();
      setAllCount(silentApplause + activeApplause);
    })();
  }, [pageId]);

  // casts a silent timeout after 30 seconds to boost the applause function
  React.useEffect(() => {
    const silentApplauseTimeout = setTimeout(silentApplause, 30000);
    return clearTimeout(silentApplauseTimeout);
  }, []);

  // triggers the applause (on click) and also tracks it
  const applause = () => {
    debouncedApplauseCount.current = (debouncedApplauseCount.current || 0) + 1;
    debouncedSend();
    event('interaction/applause', 'interaction');
  };

  // triggers the silent applause (after 30 s)
  const silentApplause = () => {
    debouncedSilentApplauseCount.current =
      (debouncedSilentApplauseCount.current || 0) + 1;
    debouncedSend();
  };

  // waits for a second to deliver applause to collect several events
  const debouncedSend = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = (setTimeout(
      () =>
        doSend({
          silentApplause: debouncedSilentApplauseCount.current || 0,
          activeApplause: debouncedApplauseCount.current || 0,
        }),
      1000
    ) as unknown) as number; // one second
  };

  // really sends the data to the server
  const doSend = async (increment: {
    silentApplause: number;
    activeApplause: number;
  }) => {
    debouncedApplauseCount.current = 0;
    incrementPage(pageId, increment.activeApplause);

    const payload = {
      pageId,
      increment,
    };

    await globalThis.fetch(`${BASE_URL}/addApplause?d=${encode(payload)}`);
  };

  // triggers the local and remote changes of a clap
  const sendApplause = () => {
    setUserCount((c) => c + 1);
    setAllCount((c) => c + 1);

    applause();
  };

  return (
    <Box onClick={sendApplause}>
      <IconApplause />
      <Label>Applaus</Label>
      {userCount > 0 && <UserBubble>{userCount}</UserBubble>}
      {allCount > 0 && <Bubble>{allCount}</Bubble>}
    </Box>
  );
};

const Box = styled.button`
  background: transparent;
  border: 0;
  margin-bottom: ${space[0]};
  color: ${color.text20};
  position: relative;
  &:focus {
    outline: none;
  }
`;

const Bubble = styled.div`
  position: absolute;
  top: calc(${space[1]} + 12px);
  right: -${space[1]};
  font-weight: bold;
  font-size: ${fontSize[1]};
  height: ${space[2]};
  min-width: ${space[2]};
  border-radius: ${space[1]};
  background: ${color.background30};
  padding: 0 5px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserBubble = styled(Bubble)`
  background: ${color.highlight30};
  top: 0;
`;

const Label = styled.div`
  font-size: ${fontSize[0]};
  line-height: 1;
`;
