import { tmpdir } from 'os';
import { reindexBucket } from './reindex-bucket';
import { addCors } from './storage';

const TMP_DIR = `${tmpdir()}/carda-imagine`;

const run = async () => {
  const t4 = Date.now();
  await reindexBucket(TMP_DIR);
  await addCors();
  const t5 = Date.now();
  console.log(`(5) reindexed bucket in ${t5 - t4} ms`);
};

run();
