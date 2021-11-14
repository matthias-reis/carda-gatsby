import { tmpdir } from 'os';
import { reindexBucket } from './reindex-bucket';

const TMP_DIR = `${tmpdir()}/carda-imagine`;

const run = async () => {
  const t4 = Date.now();
  await reindexBucket(TMP_DIR);
  const t5 = Date.now();
  console.log(`(5) reindexed bucket in ${t5 - t4} ms`);
};

run();
